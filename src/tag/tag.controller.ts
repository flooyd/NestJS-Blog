import { Body, Controller, Get, Post } from "@nestjs/common";
import { TagEntity } from "./tag.entity";
import { TagService } from "./tag.service";

@Controller('tags')
export class TagController {
    constructor(private readonly tagService: TagService) {}

    @Get()
    async findAll(): Promise<TagEntity[]> {
        const tags = await this.tagService.findAll();
        return tags;
    }

    @Post()
    async create(@Body() body: any): Promise<TagEntity> {
        console.log(body);
        return await this.tagService.create(body.name);
    }
}