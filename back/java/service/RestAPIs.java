/*
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */
package service;

import com.sun.jersey.api.spring.Autowire;
import com.sun.jersey.spi.resource.Singleton;
import entity.Object1;
import entity.Person;
import javax.persistence.EntityManager;
import entity.Property;
import entity.Thermostat;
import entity.ThermostatHistory;
import java.net.URI;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Collection;
import java.util.Date;
import java.util.List;
import java.util.UUID;
import javax.persistence.Query;
import javax.persistence.PersistenceContext;
import javax.ws.rs.Consumes;
import javax.ws.rs.DELETE;
import javax.ws.rs.FormParam;
import javax.ws.rs.GET;
import javax.ws.rs.POST;
import javax.ws.rs.PUT;
import javax.ws.rs.Path;
import javax.ws.rs.PathParam;
import javax.ws.rs.Produces;
import javax.ws.rs.core.Response;
import org.springframework.transaction.annotation.Transactional;

/**
 *
 * @author mingya
 */
@Path("api")
@Singleton
@Autowire
public class RestAPIs {
    @PersistenceContext(unitName = "EntrePU")
    protected EntityManager entityManager;
    protected PropertyRESTFacade proprf = new PropertyRESTFacade();
    protected Object1RESTFacade orf = new Object1RESTFacade();
    protected PersonRESTFacade perrf = new PersonRESTFacade();
    
    public RestAPIs() {
    }

    @POST
    @Path("property/create/")
    @Produces("application/json")
    @Consumes("application/x-www-form-urlencoded")
    @Transactional
    public Response propertyCreate(
            @FormParam("streetNu") int streetNu,
            @FormParam("streetName") String streetName,
            @FormParam("streetSuffix") String streetSuffix,
            @FormParam("city") String city,
            @FormParam("state") String state,
            @FormParam("zip") String zip,
            @FormParam("country") String country,
            @FormParam("name") String name,
            @FormParam("ownerId") int ownerId
            ) {
        try {
            Query query = entityManager.createQuery("SELECT object(o) "
                    + "FROM Person o WHERE o.id="+ownerId);
            Person owner = (Person)query.getSingleResult();
            Property np = new Property();
            np.setCity(city);
            np.setCountry(country);
            np.setName(name);
            np.setOwnerId(owner);
            np.setState(state);
            np.setStreetName(streetName);
            np.setStreetNu(streetNu);
            np.setStreetSuffix(streetSuffix);
            np.setZip(zip);
            entityManager.persist(np);
            ResponseObject resp = new ResponseObject("success");
            return Response.status(201).entity(resp).build();
        } finally {
            entityManager.close();
        }
    }
    
    @POST
    @Path("property/update/{id}")
    @Produces("application/json")
    @Consumes("application/x-www-form-urlencoded")
    @Transactional
    public Response propertyUpdate(
            @PathParam("id") int id,
            @FormParam("streetNu") int streetNu,
            @FormParam("streetName") String streetName,
            @FormParam("streetSuffix") String streetSuffix,
            @FormParam("city") String city,
            @FormParam("state") String state,
            @FormParam("zip") String zip,
            @FormParam("country") String country,
            @FormParam("name") String name,
            @FormParam("ownerId") int ownerId
            ) {
        try {
            Property up = entityManager.find(Property.class, id);
            up.setCity(city);
            up.setCountry(country);
            up.setName(name);
            up.setState(state);
            up.setStreetName(streetName);
            up.setStreetNu(streetNu);
            up.setStreetSuffix(streetSuffix);
            up.setZip(zip);
            entityManager.merge(up);
            return Response.status(201).entity(new ResponseObject("success")).build();
        } finally {
            entityManager.close();
        }
    }
    
    
    
    
    
    
    
    
    @POST
    @Path("object/create/")
    @Produces("application/json")
    @Consumes("application/x-www-form-urlencoded")
    @Transactional
    public Response objectCreate(
            @FormParam("name") String name,
            @FormParam("objectType") String objectType,
            @FormParam("propertyId") int propertyId,
            @FormParam("ownerId") int ownerId
            ) {
        try {
            Query query1 = entityManager.createQuery("SELECT object(o) "
                    + "FROM Person o WHERE o.id="+ownerId);
            Query query2 = entityManager.createQuery("SELECT object(o) "
                    + "FROM Property o WHERE o.id="+propertyId);
            Person owner = (Person)query1.getSingleResult();
            Property property = (Property)query2.getSingleResult();
            Object1 no = new Object1();
            no.setOwnerId(owner);
            no.setPropertyId(property);
            no.setObjectType(objectType);
            no.setName(name);
            no.setUuid(UUID.fromString("00000000-0000-0000-0000-000000000000"));
            entityManager.persist(no);
            ResponseObject resp = new ResponseObject("success");
            return Response.status(201).entity(resp).build();
        } finally {
            entityManager.close();
        }
    }
    
    @POST
    @Path("object/update/{id}")
    @Produces("application/json")
    @Consumes("application/x-www-form-urlencoded")
    @Transactional
    public Response objectCreate(
            @PathParam("id") int id,
            @FormParam("name") String name,
            @FormParam("objectType") String objectType,
            @FormParam("propertyId") int propertyId
            ) {
        try {
            Object1 uo = entityManager.find(Object1.class, id);
            Query query2 = entityManager.createQuery("SELECT object(o) "
                    + "FROM Property o WHERE o.id="+propertyId);
            Property property = (Property)query2.getSingleResult();
            uo.setPropertyId(property);
            uo.setObjectType(objectType);
            uo.setName(name);
            entityManager.merge(uo);
            ResponseObject resp = new ResponseObject("success");
            return Response.status(201).entity(resp).build();
        } finally {
            entityManager.close();
        }
    }
    
    @GET
    @Path("object/for_property/{id}")
    @Produces("application/xml")
    @Transactional
    public Collection<Object1> objectForProperty(
            @PathParam("id") int id
            ) {
        try {
            Property property = entityManager.find(Property.class, id);
            return property.getObject1Collection();
        } finally {
            entityManager.close();
        }
    }
    
    @GET
    @Path("thermostat/for_object/{id}")
    @Produces("application/xml")
    @Transactional
    public Collection<Thermostat> thermostatForObject(
            @PathParam("id") int id
            ) {
        try {
            Object1 obj = entityManager.find(Object1.class, id);
            return obj.getThermostatCollection();
        } finally {
            entityManager.close();
        }
    }
        
    @POST
    @Path("hello_world")
    @Produces("application/json")
    @Consumes("application/x-www-form-urlencoded")
    @Transactional
    public Response helloWorld() {
        ResponseObject resp = new ResponseObject("success");
        return Response.status(201).entity(resp).build();
    }
    
    @POST
    @Path("thermostat/update")
    @Produces("application/json")
    @Consumes("application/x-www-form-urlencoded")
    @Transactional
    public Response thermostatUpdate(
            @FormParam("uuid") String uuid,
            @FormParam("timestamp") String timestamp,
            @FormParam("currentTemp") double currentTemp
            ) throws ParseException {
        try {
            UUID id = UUID.fromString(uuid);
            Query query = entityManager.createNativeQuery("SELECT * "
                    + "FROM object WHERE uuid='" + id + "'", Object1.class);
            Object1 obj = (Object1)query.getSingleResult();
            
            Thermostat t = obj.getThermostatCollection().iterator().next();
            t.setCurrentTemp(currentTemp);
            entityManager.merge(t);
            //TODO do timestamp stuff. Add timestamp field to object.
            
            ThermostatHistory th = new ThermostatHistory();
            
            SimpleDateFormat parserSDF=new SimpleDateFormat("yyyy-mm-dd HH:mm:ss");
            Date timestampdate = parserSDF.parse(timestamp);
            
            th.setObjectId(obj);
            th.setThermostatId(t);
            th.setTimestamp(timestampdate);
            th.setCurrentTemp(currentTemp);
            entityManager.persist(th);
            
            ResponseObject resp = new ResponseObject("success");
            if(t.getSetTemp() != null){
                resp.setResponse(t.getSetTemp().toString());
            } else {
                resp.setResponse("no set temp.");
            }
            return Response.status(201).entity(resp).build();
        } finally {
            entityManager.close();
        }
    }
    
    @POST
    @Path("thermostat/change_temp")
    @Produces("application/json")
    @Consumes("application/x-www-form-urlencoded")
    @Transactional
    public Response thermostatChangeSetTemp(
            @FormParam("id") int id,
            @FormParam("setTemp") double setTemp
            ) {
        try {
            Thermostat t = entityManager.find(Thermostat.class, id);
            t.setSetTemp(setTemp);
            entityManager.merge(t);
            return Response.status(201).entity(new ResponseObject("success")).build();
        } finally {
            entityManager.close();
        }
    }
    
    @GET
    @Path("person/objects_per_owner/{id}")
    @Produces("application/json")
    @Consumes("application/x-www-form-urlencoded")
    @Transactional
    public List<Object> objectsPerOwner(
            @PathParam("id") int id
            ) {
        try {
            /*
            Query query = entityManager.createNativeQuery("SELECT person.id, COUNT(object.id) "
                    + "FROM Person JOIN Object ON Person.id=Object.owner_id WHERE person.id=" + id + 
                    " GROUP BY person.id");
                    */
            Query query = entityManager.createNativeQuery("SELECT property.id, "
                    + "property.name as property_id, person.id as owner_id, "
                    + "COUNT(object.id) as object_num FROM (property JOIN person "
                    + "ON person.id=property.owner_id and person.id = " + id + ") JOIN Object ON "
                    + "property.id=Object.property_id GROUP BY property.id, person.id;");
            //Object1 obj = (Object1)query.getSingleResult();
            //return obj.getThermostatCollection();
            //return Response.status(201).entity(new ResponseObject("success")).build();
            return query.getResultList();
        } finally {
            entityManager.close();
        }
    }
}
