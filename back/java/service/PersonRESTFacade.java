/*
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */
package service;

import com.sun.jersey.api.spring.Autowire;
import com.sun.jersey.spi.resource.Singleton;
import javax.persistence.EntityManager;
import entity.Person;
import java.net.URI;
import java.util.List;
import javax.persistence.Query;
import javax.persistence.PersistenceContext;
import javax.ws.rs.Consumes;
import javax.ws.rs.DELETE;
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
@Path("person")
@Singleton
@Autowire
public class PersonRESTFacade {
    @PersistenceContext(unitName = "EntrePU")
    protected EntityManager entityManager;

    public PersonRESTFacade() {
    }

    @POST
    @Consumes({"application/xml", "application/json"})
    @Transactional
    public Response create(Person entity) {
        entityManager.persist(entity);
        return Response.created(URI.create(entity.getId().toString())).build();
    }

    @PUT
    @Consumes({"application/xml", "application/json"})
    @Transactional
    public void edit(Person entity) {
        entityManager.merge(entity);
    }

    @DELETE
    @Path("{id}")
    @Transactional
    public void remove(@PathParam("id") Integer id) {
        Person entity = entityManager.getReference(Person.class, id);
        entityManager.remove(entity);
    }

    @GET
    @Path("{id}")
    @Produces({"application/xml", "application/json"})
    @Transactional
    public Person find(@PathParam("id") Integer id) {
        return entityManager.find(Person.class, id);
    }

    @GET
    @Produces({"application/xml", "application/json"})
    @Transactional
    public List<Person> findAll() {
        return find(true, -1, -1);
    }

    @GET
    @Path("{max}/{first}")
    @Produces({"application/xml", "application/json"})
    @Transactional
    public List<Person> findRange(@PathParam("max") Integer max, @PathParam("first") Integer first) {
        return find(false, max, first);
    }

    @GET
    @Path("count")
    @Produces("text/plain")
    @Transactional
    public String count() {
        try {
            Query query = entityManager.createQuery("SELECT count(o) FROM Person AS o");
            return query.getSingleResult().toString();
        } finally {
            entityManager.close();
        }
    }

    private List<Person> find(boolean all, int maxResults, int firstResult) {
        try {
            Query query = entityManager.createQuery("SELECT object(o) FROM Person AS o");
            if (!all) {
                query.setMaxResults(maxResults);
                query.setFirstResult(firstResult);
            }
            return query.getResultList();
        } finally {
            entityManager.close();
        }
    }
    
}
