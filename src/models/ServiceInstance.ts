import { BaseODataModel, ODataColumn, ODataModel } from "@odata/server";

@ODataModel()
export class ServiceInstance extends BaseODataModel {

  @ODataColumn({ primary: true, generated: "uuid" })
  ObjectID: string;

  @ODataColumn()
  ServiceName: string;

  @ODataColumn({ nullable: true, default: 0 })
  ServiceVersion: number;

  @ODataColumn()
  InstanceHost: string;

  @ODataColumn()
  InstancePort: number;

  @ODataColumn({ nullable: true, default: "http" })
  InstanceProtocol: string;

  @ODataColumn({ nullable: true, default: "health" })
  InstanceHealthPath: string;

}