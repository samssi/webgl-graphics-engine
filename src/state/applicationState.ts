import {Entity} from "../interface/entity";

export type Descriptor = string
export type EntityMap = Map<Descriptor, Entity>

export const applicationState = (() => {
    let entityMap: EntityMap = new Map();

    return {
        putEntity(updateEntity: Entity): void {
            entityMap.set(updateEntity.descriptor, updateEntity);
        },
        getEntity(descriptor: Descriptor): Entity {
            const entity = entityMap.get(descriptor);
            if (!entity) {
                throw new Error("Reference to non existing entity!")
            }
            return structuredClone(entity);
        },
        entities(): Entity[] {
            // TODO: descriptors (map key) will be used to control with descriptor lists which entities are drawn and which are not
            // TODO: and with which shader they are drawn
            return structuredClone(Array.from(entityMap.values()))
        }
    }
})();