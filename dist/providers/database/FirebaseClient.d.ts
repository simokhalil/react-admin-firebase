import { RAFirebaseOptions } from "index";
import { messageTypes } from "../../misc";
import { IFirebaseWrapper } from "./firebase/IFirebaseWrapper";
import { IFirebaseClient } from "./IFirebaseClient";
export declare class FirebaseClient implements IFirebaseClient {
    private fireWrapper;
    private options;
    private db;
    private rm;
    constructor(fireWrapper: IFirebaseWrapper, options: RAFirebaseOptions);
    apiGetList(resourceName: string, params: messageTypes.IParamsGetList): Promise<messageTypes.IResponseGetList>;
    apiGetOne(resourceName: string, params: messageTypes.IParamsGetOne): Promise<messageTypes.IResponseGetOne>;
    apiCreate(resourceName: string, params: messageTypes.IParamsCreate): Promise<messageTypes.IResponseCreate>;
    apiUpdate(resourceName: string, params: messageTypes.IParamsUpdate): Promise<messageTypes.IResponseUpdate>;
    apiUpdateMany(resourceName: string, params: messageTypes.IParamsUpdateMany): Promise<messageTypes.IResponseUpdateMany>;
    apiDelete(resourceName: string, params: messageTypes.IParamsDelete): Promise<messageTypes.IResponseDelete>;
    apiDeleteMany(resourceName: string, params: messageTypes.IParamsDeleteMany): Promise<messageTypes.IResponseDeleteMany>;
    apiGetMany(resourceName: string, params: messageTypes.IParamsGetMany): Promise<messageTypes.IResponseGetMany>;
    apiGetManyReference(resourceName: string, params: messageTypes.IParamsGetManyReference): Promise<messageTypes.IResponseGetManyReference>;
    private tryGetResource;
    private getCurrentUserEmail;
    private parseDataAndUpload;
    private uploadAndGetLink;
    private saveFile;
}
