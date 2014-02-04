/*
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */
package service;

/**
 *
 * @author mingya
 */
public class ResponseObject {
    String response;
    boolean success;
 
    public ResponseObject(){
    }
    
    public ResponseObject(String defaults){
        if(defaults.equals("fail")){
            this.response = "Error. Please check your AJAX request.";
            this.success = false;
        }
        if(defaults.equals("success")){
            this.response = "OK";
            this.success = true;
        }
    }
    
    public String getResponse() {
	return response;
    }
 
    public void setResponse(String response) {
        this.response = response;
    }

    public boolean getSuccess() {
        return success;
    }

    public void setSuccess(boolean success) {
        this.success = success;
    }

    @Override
    public String toString() {
        return "ResponseObject [response=" + response + ", success=" + success + "]";
    }

}
