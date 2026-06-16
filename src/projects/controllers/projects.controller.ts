import { Controller } from '@nestjs/common';
import { ProjectsService } from '../services/projects.service';

@Controller('project')
export class ProjectsController {
    
    constructor(private readonly projecService: ProjectsService){}
    // aqui se colocan los decoradores de la clases que se vallana a usar

}
