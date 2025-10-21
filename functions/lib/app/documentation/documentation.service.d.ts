import { Response } from 'express';
export declare class DocumentationService {
    private readonly logger;
    constructor();
    downloadResource(resourceId: string, res: Response): Promise<any>;
    private trackDownload;
    getResourceStats(): Promise<any>;
}
