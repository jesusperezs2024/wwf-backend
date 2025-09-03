import { 
    Repository, 
    FindOptionsWhere, 
    FindOneOptions, 
    FindManyOptions, 
    ObjectLiteral,
    DeepPartial
  } from "typeorm";
  import { AppDataSource } from "../db/connection";
  
  export class BaseRepository<T extends ObjectLiteral> {
    protected repository: Repository<T>;
    
    constructor(entityClass: new () => T) {
      this.repository = AppDataSource.getRepository<T>(entityClass);
    }
  
    async findAll(options?: FindManyOptions<T>): Promise<T[]> {
      return this.repository.find(options);
    }
  
    async findById(id: number): Promise<T | null> {
      return this.repository.findOneBy({ id } as unknown as FindOptionsWhere<T>);
    }
  
    async findOne(options: FindOneOptions<T>): Promise<T | null> {
      return this.repository.findOne(options);
    }
  
    async create(data: DeepPartial<T>): Promise<T> {
      const entity = this.repository.create(data);
      return this.repository.save(entity as T);
    }
  
    async update(id: number, data: DeepPartial<T>): Promise<T | null> {
      await this.repository.update(id, data as any);
      return this.findById(id);
    }
  
    async delete(id: number): Promise<boolean> {
      const result = await this.repository.delete(id);
      return !!result.affected;
    }
  
    async count(options?: FindManyOptions<T>): Promise<number> {
      return this.repository.count(options);
    }
  
    async exists(id: number): Promise<boolean> {
      const count = await this.repository.count({
        where: { id } as unknown as FindOptionsWhere<T>
      });
      return count > 0;
    }
  
    async save(entity: DeepPartial<T>): Promise<T> {
      return this.repository.save(entity as T);
    }
  
    async saveMany(entities: DeepPartial<T>[]): Promise<T[]> {
      return this.repository.save(entities as T[]);
    }
  
    async findWithRelations(relations: string[]): Promise<T[]> {
      return this.repository.find({
        relations
      });
    }
  
    async findByIdWithRelations(id: number, relations: string[]): Promise<T | null> {
      return this.repository.findOne({
        where: { id } as unknown as FindOptionsWhere<T>,
        relations
      });
    }
  }