/*
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */
package service;

/**
 *
 * @author mingya
 */
public class RegistrationObject {
    String response;
    boolean success;
    String uuid;
 
    public RegistrationObject(){
    }
    
    public RegistrationObject(String uuid){
        if(uuid != null){
            this.response = "OK";
            this.success = true;
            this.uuid = uuid;
        }
    }
    
    public String getResponse() {
	return response;
    }
 
    public void setRespose(String response) {
        this.response = response;
    }
    
    public String getUuid() {
	return uuid;
    }
 
    public void setUuid(String uuid) {
        this.uuid = uuid;
    }

    public boolean getSuccess() {
        return success;
    }

    public void setSuccess(boolean success) {
        this.success = success;
    }

    @Override
    public String toString() {
        return "ResponseObject [success=" + success + ", dev_id=" + uuid + "]";
    }

}
