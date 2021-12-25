import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { TagEntity } from "./tag.entity";

@Injectable()
export class TagService {
    constructor(
        @InjectRepository(TagEntity)
        private readonly tagRepository: Repository<TagEntity>
        ) {};

    async findAll(): Promise<TagEntity[]> {
        return await this.tagRepository.find();
    }

    async create(name): Promise<TagEntity> {
        const newTag = await this.tagRepository.create({name})
        await this.tagRepository.save(newTag)

        return newTag;
    }
}