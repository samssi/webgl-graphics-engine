import {Entity3d} from "../interface/entity3d";

export type Descriptor = string
export type EntityMap = Map<Descriptor, Entity3d>

export const applicationState3d = (() => {
    let entityMap: EntityMap = new Map();

    return {
        putEntity(updateEntity: Entity3d): void {
            entityMap.set(updateEntity.descriptor, updateEntity);
        },
        getEntity(descriptor: Descriptor): Entity3d {
            const entity = entityMap.get(descriptor);
            if (!entity) {
                throw new Error("Reference to non existing entity!")
            }
            return structuredClone(entity);
        },
        entities(): Entity3d[] {
            // TODO: descriptors (map key) will be used to control with descriptor lists which entities are drawn and which are not
            // TODO: and with which shader they are drawn
            return structuredClone(Array.from(entityMap.values()))
        }
    }
})();