import requests
import xml.etree.ElementTree as ET
import ast
import sched, time
import exceptions

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

currentTemp = 72


######GET CURRENT TEMP######
def getCurrentTemp(currentTemp):
    #TODO add real code here
    return currentTemp - 1


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
    currentTemp = getCurrentTemp(currentTemp)
    updateSelf(currentTemp, uuid)





#s = sched.scheduler(time.time, time.sleep)
#def do_something(sc): 
#    print "Doing stuff..."
#    # do your stuff
#    sc.enter(5*60, 1, do_something, (sc,))
#
#s.enter(60, 1, do_something, (s,))
#s.run()

#import xml.dom.minidom
#xml.dom.minidom.parseString(xml_string)
#pretty_xml_as_string = xml.toprettyxml()

url="http://localhost:8080/Entre/resources/api/hello_world"
r = requests.post(url)
print r.text
print r.json()


url="http://localhost:8080/Entre/resources/object"
r = requests.get(url)
print r.text
root = ET.fromstring(r.text)
#for child in root:
#    print child.tag, child.attrib
#for name in root.iter('name'):
#    print name.text
for object1 in root.findall('object1'):
    for objId in object1.findall('id'): 
        print objId.text
 


