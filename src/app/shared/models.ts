export class Resource {

    constructor() {
        this.technologies = [];
        this.categories = [];
    }

    id?:          string;
    title?:       string;
    description?: string;
    url?:         string;

    technologies: string[];
    categories:   string[];
}