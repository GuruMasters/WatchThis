import { DocumentationService } from './documentation.service';
import { Response } from 'express';
export declare class DocumentationController {
    private readonly documentationService;
    constructor(documentationService: DocumentationService);
    downloadResource(resourceId: string, res: Response): Promise<any>;
    getResourceStats(): Promise<any>;
}
