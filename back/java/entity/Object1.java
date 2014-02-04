/*
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */
package entity;

import java.io.Serializable;
import java.util.Collection;
import java.util.UUID;
import javax.persistence.Basic;
import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.Lob;
import javax.persistence.ManyToOne;
import javax.persistence.NamedQueries;
import javax.persistence.NamedQuery;
import javax.persistence.OneToMany;
import javax.persistence.Table;
import javax.xml.bind.annotation.XmlRootElement;
import javax.xml.bind.annotation.XmlTransient;

/**
 *
 * @author mingya
 */
@Entity
@Table(name = "object")
@XmlRootElement
@NamedQueries({
    @NamedQuery(name = "Object1.findAll", query = "SELECT o FROM Object1 o"),
    @NamedQuery(name = "Object1.findById", query = "SELECT o FROM Object1 o WHERE o.id = :id"),
    @NamedQuery(name = "Object1.findByName", query = "SELECT o FROM Object1 o WHERE o.name = :name"),
    @NamedQuery(name = "Object1.findByLocationEnabled", query = "SELECT o FROM Object1 o WHERE o.locationEnabled = :locationEnabled"),
    @NamedQuery(name = "Object1.findByWifiConnected", query = "SELECT o FROM Object1 o WHERE o.wifiConnected = :wifiConnected"),
    @NamedQuery(name = "Object1.findByObjectType", query = "SELECT o FROM Object1 o WHERE o.objectType = :objectType")})
public class Object1 implements Serializable {
    private static final long serialVersionUID = 1L;
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Basic(optional = false)
    @Column(name = "id")
    private Integer id;
    @Lob
    //@Column(name = "uuid")
    @Column(columnDefinition="uuid")
    private UUID uuid;
    @Column(name = "name")
    private String name;
    @Column(name = "location_enabled")
    private Boolean locationEnabled;
    @Column(name = "wifi_connected")
    private Boolean wifiConnected;
    @Column(name = "object_type")
    private String objectType;
    @OneToMany(mappedBy = "objectId", orphanRemoval=true)
    private Collection<Thermostat> thermostatCollection;
    @JoinColumn(name = "property_id", referencedColumnName = "id")
    @ManyToOne
    private Property propertyId;
    @JoinColumn(name = "owner_id", referencedColumnName = "id")
    @ManyToOne
    private Person ownerId;
    //@OneToMany(cascade=CascadeType.ALL, orphanRemoval=true, mappedBy = "objectId")
    @OneToMany(mappedBy = "objectId", orphanRemoval=true)
    private Collection<ThermostatHistory> thermostatHistoryCollection;

    public Object1() {
    }

    public Object1(Integer id) {
        this.id = id;
    }

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public Object getUuid() {
        return uuid;
    }

    public void setUuid(UUID uuid) {
        this.uuid = uuid;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public Boolean getLocationEnabled() {
        return locationEnabled;
    }

    public void setLocationEnabled(Boolean locationEnabled) {
        this.locationEnabled = locationEnabled;
    }

    public Boolean getWifiConnected() {
        return wifiConnected;
    }

    public void setWifiConnected(Boolean wifiConnected) {
        this.wifiConnected = wifiConnected;
    }

    public String getObjectType() {
        return objectType;
    }

    public void setObjectType(String objectType) {
        this.objectType = objectType;
    }

    @XmlTransient
    public Collection<Thermostat> getThermostatCollection() {
        return thermostatCollection;
    }

    public void setThermostatCollection(Collection<Thermostat> thermostatCollection) {
        this.thermostatCollection = thermostatCollection;
    }

    public Property getPropertyId() {
        return propertyId;
    }

    public void setPropertyId(Property propertyId) {
        this.propertyId = propertyId;
    }

    public Person getOwnerId() {
        return ownerId;
    }

    public void setOwnerId(Person ownerId) {
        this.ownerId = ownerId;
    }

    @XmlTransient
    public Collection<ThermostatHistory> getThermostatHistoryCollection() {
        return thermostatHistoryCollection;
    }

    public void setThermostatHistoryCollection(Collection<ThermostatHistory> thermostatHistoryCollection) {
        this.thermostatHistoryCollection = thermostatHistoryCollection;
    }

    @Override
    public int hashCode() {
        int hash = 0;
        hash += (id != null ? id.hashCode() : 0);
        return hash;
    }

    @Override
    public boolean equals(Object object) {
        // TODO: Warning - this method won't work in the case the id fields are not set
        if (!(object instanceof Object1)) {
            return false;
        }
        Object1 other = (Object1) object;
        if ((this.id == null && other.id != null) || (this.id != null && !this.id.equals(other.id))) {
            return false;
        }
        return true;
    }

    @Override
    public String toString() {
        return "entity.Object1[ id=" + id + " ]";
    }
    
}
