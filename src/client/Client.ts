import { OData, ODataNewOptions } from "@odata/client";
import { ServiceInstance } from "../models";


interface ServiceOption {
  url: string,
  service: Partial<ServiceInstance>
  user?: string,
  password?: string,
}

export const registerService = async (opt: ServiceOption) => {

  const config: ODataNewOptions = {
    metadataUri: `${opt.url}/sd/$metadata`,
  };

  if (opt.user && opt.password) {
    config.credential.username = opt.user;
    config.credential.password = opt.password;
  }

  const client = OData.New4(config);

  const es = client.getEntitySet<ServiceInstance>("ServiceInstances");

  const foundInstances = await es.find({
    ServiceName: opt.service.ServiceName,
    InstanceHost: opt.service.InstanceHost,
    InstancePort: opt.service.InstancePort
  });

  let service: ServiceInstance;

  if (foundInstances.length > 0) {
    service = foundInstances[0];
  } else {
    service = await es.create(opt.service);
  }


  const leaveRegistry = async () => {
    es.delete(service.ObjectID);
  };

  const findServices = async (serviceName: string, version?: number) => {
    const quickFindOption: Partial<ServiceInstance> = {};

    quickFindOption.ServiceName = serviceName;
    if (typeof version == 'number') {
      quickFindOption.ServiceVersion = version;
    }

    return es.find(quickFindOption);

  };

  return {
    leaveRegistry,
    findServices
  };

};