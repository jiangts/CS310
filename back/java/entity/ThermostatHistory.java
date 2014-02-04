/*
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */
package entity;

import java.io.Serializable;
import java.util.Date;
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
import javax.persistence.Table;
import javax.persistence.Temporal;
import javax.persistence.TemporalType;
import javax.xml.bind.annotation.XmlRootElement;

/**
 *
 * @author mingya
 */
@Entity
@Table(name = "thermostat_history")
@XmlRootElement
@NamedQueries({
    @NamedQuery(name = "ThermostatHistory.findAll", query = "SELECT t FROM ThermostatHistory t"),
    @NamedQuery(name = "ThermostatHistory.findById", query = "SELECT t FROM ThermostatHistory t WHERE t.id = :id"),
    @NamedQuery(name = "ThermostatHistory.findByTimestamp", query = "SELECT t FROM ThermostatHistory t WHERE t.timestamp = :timestamp"),
    @NamedQuery(name = "ThermostatHistory.findBySetTemp", query = "SELECT t FROM ThermostatHistory t WHERE t.setTemp = :setTemp"),
    @NamedQuery(name = "ThermostatHistory.findByCurrentTemp", query = "SELECT t FROM ThermostatHistory t WHERE t.currentTemp = :currentTemp")})
public class ThermostatHistory implements Serializable {
    private static final long serialVersionUID = 1L;
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Basic(optional = false)
    @Column(name = "id")
    private Integer id;
    @Column(name = "timestamp")
    @Temporal(TemporalType.TIMESTAMP)
    private Date timestamp;
    // @Max(value=?)  @Min(value=?)//if you know range of your decimal fields consider using these annotations to enforce field validation
    @Column(name = "set_temp")
    private Double setTemp;
    @Column(name = "current_temp")
    private Double currentTemp;
    @JoinColumn(name = "thermostat_id", referencedColumnName = "id")
    @ManyToOne
    private Thermostat thermostatId;
    @JoinColumn(name = "object_id", referencedColumnName = "id")
    @ManyToOne
    private Object1 objectId;

    public ThermostatHistory() {
    }

    public ThermostatHistory(Integer id) {
        this.id = id;
    }

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public Date getTimestamp() {
        return timestamp;
    }

    public void setTimestamp(Date timestamp) {
        this.timestamp = timestamp;
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

    public Thermostat getThermostatId() {
        return thermostatId;
    }

    public void setThermostatId(Thermostat thermostatId) {
        this.thermostatId = thermostatId;
    }

    public Object1 getObjectId() {
        return objectId;
    }

    public void setObjectId(Object1 objectId) {
        this.objectId = objectId;
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
        if (!(object instanceof ThermostatHistory)) {
            return false;
        }
        ThermostatHistory other = (ThermostatHistory) object;
        if ((this.id == null && other.id != null) || (this.id != null && !this.id.equals(other.id))) {
            return false;
        }
        return true;
    }

    @Override
    public String toString() {
        return "entity.ThermostatHistory[ id=" + id + " ]";
    }
    
}
