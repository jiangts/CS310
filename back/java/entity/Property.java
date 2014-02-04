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
@Table(name = "property")
@XmlRootElement
@NamedQueries({
    @NamedQuery(name = "Property.findAll", query = "SELECT p FROM Property p"),
    @NamedQuery(name = "Property.findById", query = "SELECT p FROM Property p WHERE p.id = :id"),
    @NamedQuery(name = "Property.findByStreetNu", query = "SELECT p FROM Property p WHERE p.streetNu = :streetNu"),
    @NamedQuery(name = "Property.findByStreetName", query = "SELECT p FROM Property p WHERE p.streetName = :streetName"),
    @NamedQuery(name = "Property.findByStreetSuffix", query = "SELECT p FROM Property p WHERE p.streetSuffix = :streetSuffix"),
    @NamedQuery(name = "Property.findByCity", query = "SELECT p FROM Property p WHERE p.city = :city"),
    @NamedQuery(name = "Property.findByState", query = "SELECT p FROM Property p WHERE p.state = :state"),
    @NamedQuery(name = "Property.findByZip", query = "SELECT p FROM Property p WHERE p.zip = :zip"),
    @NamedQuery(name = "Property.findByCountry", query = "SELECT p FROM Property p WHERE p.country = :country"),
    @NamedQuery(name = "Property.findByLongitude", query = "SELECT p FROM Property p WHERE p.longitude = :longitude"),
    @NamedQuery(name = "Property.findByLatitude", query = "SELECT p FROM Property p WHERE p.latitude = :latitude"),
    @NamedQuery(name = "Property.findByName", query = "SELECT p FROM Property p WHERE p.name = :name")
})
public class Property implements Serializable {
    private static final long serialVersionUID = 1L;
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Basic(optional = false)
    @Column(name = "id")
    private Integer id;
    @Column(name = "name")
    private String name;
    @Column(name = "street_nu")
    private Integer streetNu;
    @Column(name = "street_name")
    private String streetName;
    @Column(name = "street_suffix")
    private String streetSuffix;
    @Column(name = "city")
    private String city;
    @Column(name = "state")
    private String state;
    @Column(name = "zip")
    private String zip;
    @Column(name = "country")
    private String country;
    // @Max(value=?)  @Min(value=?)//if you know range of your decimal fields consider using these annotations to enforce field validation
    @Column(name = "longitude")
    private Double longitude;
    @Column(name = "latitude")
    private Double latitude;
    @JoinColumn(name = "owner_id", referencedColumnName = "id")
    @ManyToOne
    private Person ownerId;
    @OneToMany(mappedBy = "propertyId", orphanRemoval=true)
    private Collection<Object1> object1Collection;

    public Property() {
    }

    public Property(Integer id) {
        this.id = id;
    }

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }
    
    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }
    
    public Integer getStreetNu() {
        return streetNu;
    }

    public void setStreetNu(Integer streetNu) {
        this.streetNu = streetNu;
    }

    public String getStreetName() {
        return streetName;
    }

    public void setStreetName(String streetName) {
        this.streetName = streetName;
    }

    public String getStreetSuffix() {
        return streetSuffix;
    }

    public void setStreetSuffix(String streetSuffix) {
        this.streetSuffix = streetSuffix;
    }

    public String getCity() {
        return city;
    }

    public void setCity(String city) {
        this.city = city;
    }

    public String getState() {
        return state;
    }

    public void setState(String state) {
        this.state = state;
    }

    public String getZip() {
        return zip;
    }

    public void setZip(String zip) {
        this.zip = zip;
    }

    public String getCountry() {
        return country;
    }

    public void setCountry(String country) {
        this.country = country;
    }

    public Double getLongitude() {
        return longitude;
    }

    public void setLongitude(Double longitude) {
        this.longitude = longitude;
    }

    public Double getLatitude() {
        return latitude;
    }

    public void setLatitude(Double latitude) {
        this.latitude = latitude;
    }

    public Person getOwnerId() {
        return ownerId;
    }

    public void setOwnerId(Person ownerId) {
        this.ownerId = ownerId;
    }

    @XmlTransient
    public Collection<Object1> getObject1Collection() {
        return object1Collection;
    }

    public void setObject1Collection(Collection<Object1> object1Collection) {
        this.object1Collection = object1Collection;
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
        if (!(object instanceof Property)) {
            return false;
        }
        Property other = (Property) object;
        if ((this.id == null && other.id != null) || (this.id != null && !this.id.equals(other.id))) {
            return false;
        }
        return true;
    }

    @Override
    public String toString() {
        return "entity.Property[ id=" + id + " ]";
    }
    
}
