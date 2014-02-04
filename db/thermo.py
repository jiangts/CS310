import requests, exceptions, time
import xml.etree.ElementTree as ET
import random

######REGISTER DEVICE######
def register(objId):
    url = "http://localhost:8080/Entre/resources/api/thermostat/register"
    data = { 'objectId': objId }
    r = requests.post(url, data=data)
    response = r.json()
    print response
    if(response['success'] == True):
        uuid = response['uuid']
        return uuid

#TODO this number comes from interface with phone
uuid = register(3)


######GET CURRENT TEMP######
def getCurrentTemp():
    #TODO add real thermostat code here
    return random.uniform(60, 80)

currentTemp = getCurrentTemp()

from time import gmtime, strftime
######UPDATE DEVICE######
def updateSelf(currentTemp, uuid):
    url = "http://localhost:8080/Entre/resources/api/thermostat/update"
    timestamp = strftime("%Y-%m-%d %H:%M:%S", gmtime())
    data = {
        'uuid': uuid,
        'timestamp': timestamp,
        'currentTemp': currentTemp
    }
    r = requests.post(url, data = data)
    print("set temperature is: " + r.json()['response'])
    #try:
    #    setTemp = float(r.json()['response'])
    #except exceptions.ValueError:
    #    print (setTemp)
    time.sleep(60)

while True:
    print("current temperature: " + str(currentTemp))
    currentTemp = getCurrentTemp()
    updateSelf(currentTemp, uuid)
