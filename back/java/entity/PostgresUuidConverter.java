/*
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */
package entity;

import java.util.UUID;
import javax.persistence.AttributeConverter;

/**
 *
 * @author mingya
 */
@javax.persistence.Converter(autoApply = true)
public class PostgresUuidConverter implements AttributeConverter<UUID, UUID> {

    @Override
    public UUID convertToDatabaseColumn(UUID attribute) {
        return attribute;
    }

    @Override
    public UUID convertToEntityAttribute(UUID dbData) {
        return dbData;
    }

}
