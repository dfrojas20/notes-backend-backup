import { Either } from "src/utilidad/Either";
import { IApplicationService } from "./IApplicationService";

export abstract class AppServiceDecorator<TService,T> implements IApplicationService<TService,T>{
    
    private appServiceWrappee: IApplicationService<TService,T>;

    constructor(appService: IApplicationService<TService,T>){
        this.appServiceWrappee = appService;
    }

    async execute(service: TService): Promise<Either<Error,T>>{
        return this.appServiceWrappee.execute(service);   
    }

}