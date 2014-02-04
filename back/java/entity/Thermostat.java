/*
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */
package entity;

import java.io.Serializable;
import java.util.Collection;
import javax.persistence.Basic;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
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
@Table(name = "thermostat")
@XmlRootElement
@NamedQueries({
    @NamedQuery(name = "Thermostat.findAll", query = "SELECT t FROM Thermostat t"),
    @NamedQuery(name = "Thermostat.findById", query = "SELECT t FROM Thermostat t WHERE t.id = :id"),
    @NamedQuery(name = "Thermostat.findBySetTemp", query = "SELECT t FROM Thermostat t WHERE t.setTemp = :setTemp"),
    @NamedQuery(name = "Thermostat.findByCurrentTemp", query = "SELECT t FROM Thermostat t WHERE t.currentTemp = :currentTemp")})
public class Thermostat implements Serializable {
    private static final long serialVersionUID = 1L;
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Basic(optional = false)
    @Column(name = "id")
    private Integer id;
    // @Max(value=?)  @Min(value=?)//if you know range of your decimal fields consider using these annotations to enforce field validation
    @Column(name = "set_temp")
    private Double setTemp;
    @Column(name = "current_temp")
    private Double currentTemp;
    @JoinColumn(name = "object_id", referencedColumnName = "id")
    @ManyToOne
    private Object1 objectId;
    @OneToMany(mappedBy = "thermostatId", orphanRemoval=true)
    private Collection<ThermostatHistory> thermostatHistoryCollection;

    public Thermostat() {
    }

    public Thermostat(Integer id) {
        this.id = id;
    }

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public Double getSetTemp() {
        return setTemp;
    }

    public void setSetTemp(Double setTemp) {
        this.setTemp = setTemp;
    }

    public Double getCurrentTemp() {
        return currentTemp;
    }

    public void setCurrentTemp(Double currentTemp) {
        this.currentTemp = currentTemp;
    }

    public Object1 getObjectId() {
        return objectId;
    }

    public void setObjectId(Object1 objectId) {
        this.objectId = objectId;
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
        if (!(object instanceof Thermostat)) {
            return false;
        }
        Thermostat other = (Thermostat) object;
        if ((this.id == null && other.id != null) || (this.id != null && !this.id.equals(other.id))) {
            return false;
        }
        return true;
    }

    @Override
    public String toString() {
        return "entity.Thermostat[ id=" + id + " ]";
    }
    
}
