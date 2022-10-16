import {Entity, Triangle} from "../interface/video";

export type Descriptor = string
export type EntityMap = Map<Descriptor, Entity>

export const applicationState = (() => {
    let entityMap: EntityMap = new Map();

    return {
        updateEntity(updateEntity: Entity): void {
            entityMap.set(updateEntity.descriptor, updateEntity);
        },
        getEntity(descriptor: Descriptor): Entity {
            const entity = entityMap.get(descriptor);
            if (!entity) {
                throw new Error("Reference to non existing entity!")
            }
            return structuredClone(entity);
        },
        // TODO: add correct position, rotation and scale calculations for the triangle points
        triangles(): Triangle[] {
            const entities = structuredClone(Array.from(entityMap.values()));
            return entities.map(entity => entity.entity)
        }
    }
})();