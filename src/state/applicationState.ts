import {Entity2d} from "../interface/entity2d";

export type Descriptor = string;
export type EntityMap = Map<Descriptor, Entity2d>;

export const applicationState = (() => {
    let entityMap: EntityMap = new Map();

    return {
        putEntity(updateEntity: Entity2d): void {
            entityMap.set(updateEntity.descriptor, updateEntity);
        },
        getEntity(descriptor: Descriptor): Entity2d {
            const entity = entityMap.get(descriptor);
            if (!entity) {
                throw new Error("Reference to non existing entity!")
            }
            return structuredClone(entity);
        },
        entities(): Entity2d[] {
            // TODO: descriptors (map key) will be used to control with descriptor lists which entities are drawn and which are not
            // TODO: and with which shader they are drawn
            console.log(entityMap)
            return structuredClone(Array.from(entityMap.values()))
        }
    }
})();