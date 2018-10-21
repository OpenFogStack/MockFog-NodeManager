var nodes = [];
var edges = [];
var network = null;
var isOpenStack = true;

var BLACK = '#2B1B17';

var labels = ["thunder", "aftermath", "slave", "lunch", "cats", "island", "punishment", "face", "vacation", "lock", "son",
    "copper", "window", "touch", "farm", "letter", "position", "drawer", "rake", "flavor", "food", "bead", "bee", "slope",
    "ship", "sign", "airport", "sound", "writing", "plants", "flag", "tub", "spade", "guitar", "hate", "peace", "board",
    "pot", "liquid", "spy", "foot", "pull", "market", "title", "pear", "fuel", "spot", "increase", "branch", "experience",
    "eggnog", "sponge", "scene", "coat", "coast", "dime", "digestion", "death", "chin", "attack", "corn", "battle", "sofa",
    "ghost", "dad", "substance", "air", "vest", "fork", "table", "income", "night", "mind", "wall", "fog", "quince", "breath",
    "iron", "turkey", "minister", "sisters", "alarm", "stove", "limit", "oven", "tramp", "art", "zinc", "shirt", "toothbrush",
    "bat", "dog", "horses", "room", "country", "shop", "reading", "cent", "sky", "time", "grandfather", "geese", "cars",
    "bedroom", "government", "fall", "start", "stocking", "stem", "boy", "cream", "girls", "pizzas", "match", "rate", "cactus",
    "desk", "ice", "man", "account", "sticks", "condition", "motion", "pollution", "river", "produce", "middle", "jam", "oil",
    "flame", "mist", "ocean", "beginner", "need", "advertisement", "gold", "turn", "things", "effect", "bath", "distance",
    "dirt", "offer", "calculator", "basin", "quiver", "flowers", "note", "plantation", "guide", "wax", "boot", "shoes",
    "cracker", "doctor", "giraffe", "horn", "support", "current", "soap", "plough", "babies", "change", "adjustment", "plane",
    "business", "harbor", "plate", "religion", "step", "crack", "milk", "driving", "whistle", "bubble", "join", "structure",
    "ground", "brake", "sheep", "arch", "jail", "hose", "history", "team", "fly", "activity", "airplane", "worm", "destruction",
    "pail", "jar", "machine", "cast", "love", "maid", "rain", "glass", "squirrel", "hands", "bike", "stitch", "sink", "volleyball",
    "industry", "cover", "edge", "drink", "hour", "wood", "shade", "spoon", "station", "porter", "town", "war", "wrench", "birds",
    "beds", "pies", "prose", "drain", "insect", "rice", "memory", "pest", "button", "shock", "cat", "flower", "cake", "base", "popcorn",
    "picture", "poison", "railway", "store", "waves", "discovery", "calendar", "expert", "gun", "fang", "bucket", "scarf", "quill",
    "straw", "frame", "achiever", "swim", "notebook", "vessel", "control", "angle", "mother", "song", "oatmeal", "downtown", "pin",
    "gate", "cakes", "boat", "sock", "teaching", "passenger", "dress", "shake", "instrument", "wind", "society", "eye", "card", "debt",
    "bells", "test", "cup", "plastic", "trousers", "noise", "hydrant", "unit", "carpenter", "holiday", "pig", "skirt", "fireman", "blade",
    "land", "power", "look", "toothpaste", "box", "can", "teeth", "cough", "verse", "train", "crime", "education", "hand", "ladybug",
    "carriage", "interest", "friend", "sleet", "heat", "waste", "group", "marble", "books", "territory", "furniture", "run",
    "humor", "thought", "wing", "scarecrow", "burst", "church", "pigs", "pencil", "hole", "clover", "rose", "icicle", "smoke", "girl",
    "level", "color", "bag", "letters", "yak", "comparison", "mom", "tiger", "texture", "roof", "attraction", "week", "cap", "play",
    "exchange", "plot", "ticket", "jump", "question", "care", "competition", "yarn", "pipe", "grain", "deer", "playground", "library",
    "bell", "blow", "eggs", "agreement", "direction", "dinner", "taste", "jelly", "animal", "basketball", "neck", "camp", "loaf", "sister",
    "quarter", "cause", "creature", "aunt", "canvas", "space", "zephyr", "monkey", "nation", "woman", "brick", "sun", "wash", "jewel",
    "skate", "bone", "veil", "dinosaurs", "sheet", "head", "price", "bikes", "part", "cellar", "sugar", "smash", "ray", "zipper",
    "underwear", "house", "vegetable", "cook", "hook", "committee", "trucks", "way", "eyes", "stretch", "stop", "car", "vein",
    "self", "amusement", "twist", "wave", "line", "chance", "actor", "stranger", "yoke", "bear", "scale", "robin", "cemetery",
    "pocket", "rule", "queen", "crib", "value", "crown", "flesh", "wool", "discussion", "seat", "lettuce", "range", "apparatus",
    "governor", "science", "observation", "field", "show", "profit", "brother", "transport", "fear", "truck", "needle", "mine",
    "trail", "idea", "weight", "argument", "expansion", "women", "daughter", "measure", "snails", "company", "sense", "doll",
    "spark", "zebra", "tendency", "wine", "fruit", "yard", "tail", "office", "oranges", "cannon", "vase", "silk", "crayon",
    "knot", "suit", "credit", "giants", "book", "system", "wilderness", "cable", "theory", "hair", "mitten", "hope", "detail",
    "trade", "stamp", "payment", "rat", "building", "cart", "door", "tank", "plant", "basket", "end"];

function getRandomLabel() {
    if (labels.length == 0) {
        return "undefined";
    }
    var index = Math.floor(Math.random() * labels.length);
    var l = labels[index];
    labels.splice(index, 1); // deletes l from labels
    return l;
}

/**
 * Called when the Visualization API is loaded.
 */
function draw() {
    //create a network
    var container = document.getElementById('mynetwork');
    nodes = new vis.DataSet();
    edges = new vis.DataSet();
    var data = {
        nodes: nodes,
        edges: edges
    };
    var options = {
        nodes: {
            scaling: {
                min: 16,
                max: 32
            }
        },
//        physics: {
//            "enabled": true,
//            repulsion: {damping:0.01,centralGravity: 100,nodeDistance:0.1}
//        },
        physics: {
            barnesHut: {
                gravitationalConstant: -10000,
                centralGravity: 1.0,
                springLength: 110,
                springConstant: .114,
                damping: .20,
                avoidOverlap: 80.9
            },
              forceAtlas2Based: {
                gravitationalConstant: -50,
                centralGravity: 0.01,
                springConstant: 1.18,
                springLength: 110,
                damping: .34,
                avoidOverlap: 25.9
            },
              repulsion: {
                centralGravity: 0.2,
                springLength: 40,
                springConstant: 1.15,
                nodeDistance: 230,
                damping: .05
            },
              hierarchicalRepulsion: {
                centralGravity: 0.0,
                springLength: 110,
                springConstant: 1.11,
                nodeDistance: 250,
                damping: .09
            },
            maxVelocity: 100,
            minVelocity: .8,
            solver: 'barnesHut',
            stabilization: {
              enabled: true,
              iterations: 1000,
              updateInterval: 100,
              onlyDynamicEdges: false,
              fit: true
            },
            timestep: 0.5,
            adaptiveTimestep: true            
        },        
        edges: {
            color: BLACK,
            font: {align: 'top'},
            smooth: false,
            arrows: "to"
        },
        // define the different visualisations of devices
        groups: {
            "cloud": {
                shape: 'circularImage',
                image: './vendor/vis.js/img/mockfog/cloud.svg',
                size: 25,
                color: {background: "#fff", color: "#fff", border: "black"},
                font: {color: "#000", size: 12}
            },
            //t2.large
            "device_lg": {
                shape: 'circularImage',
                image: './vendor/vis.js/img/mockfog/device_lg.svg',
                size: 25,
                color: {background: "#fff", color: "#fff", border: "black"},
                font: {color: "#000", size: 12}
            },
            //t2.small
            "device_ml": {
                shape: 'circularImage',
                image: './vendor/vis.js/img/mockfog/device_ml.svg',
                size: 25,
                color: {background: "#fff", color: "#fff", border: "black"},
                font: {color: "#000"}
            },
            //t2.micro
            "device_sm": {
                shape: 'circularImage',
                image: './vendor/vis.js/img/mockfog/device_sm.svg',
                size: 25,
                color: {background: "#fff", color: "#fff", border: "black"},
                font: {color: "#000"}
            },
            "router": {
                shape: 'circularImage',
                image: './vendor/vis.js/img/mockfog/router.svg',
                color: {background: "#fff", color: "#fff", border: "black"},
                font: {color: "#000"}
            },
            "net": {
                shape: 'circularImage',
                image: './vendor/vis.js/img/mockfog/subnet.svg',
                size: 25,
                color: {background: "#fff", color: "#fff", border: "black"},
                font: {color: "#000", size: 12}
            },
            "internet": {
                shape: 'circularImage',
                size: 41,
                shapeProperties: {useImageSize: true, useImageSize: 10, size: 0.7},
                image: './vendor/vis.js/img/mockfog/internet.svg',
                color: {background: "#fff", color: "#fff", border: "black"},
                font: {color: "#000"}
            }
        },
        manipulation: {
            enabled: false,
            addEdge: function (inputdata, callback) {
                console.log('add edge', inputdata);
                if (inputdata.from == inputdata.to) {
                    alert("Illegal connection of a component to itself");
                } else {
                    var nodeFromId = inputdata.from;
                    var nodeToId = inputdata.to;
                    $.ajax({
                        type: "POST",
                        url: BASE_URL + "doc/" + DOCID + "/edge/" + nodeFromId + "/" + nodeToId,
                        dataType: 'json',
                        success: function(data) {
                            // draw into the canvas
                            node = data[ Object.keys(data)[0] ];
                            keysFrom =  Object.keys( node.edgesBack );
                            for (i=0; i<keysFrom.length; i++) {
                                if (keysFrom[i] == nodeFromId || keysFrom[i] == nodeToId) {
                                    edge = node.edgesBack[keysFrom[i]];
                                    edge.to = Object.keys(data)[0];
                                    edge.from = keysFrom[i];
                                    edge = castEdge(edge, edge.from, edge.to);
                                    edges.remove(edge.id);
                                    edges.add(edge);
                                    //callback(edge);
                                    console.log("found and added edge\n"+JSON.stringify(data));
                                    return;
                                }
                            }
                            console.log("PROBLEM: edge was not found and could not be added\n"+data);
                        },
                        error: function(error) {
                            console.log(error);
                            alert( "Failed to create edge: \n\n"+JSON.stringify(error) );
                            //document.getElementById("alertContent").innerHTML = "Creating this edge is (currently) impossible. See log for details.";
                            //$('#modelAlert').modal('toggle');
                        }
                    });
                }
            }
        },
        interaction: {multiselect: true}
    };
    network = new vis.Network(container, data, options);
    //#!TODO only enable when ansible output is available
    network.on('click', function (params) {
        castVertex(params);
    });

}


function initialize() {
    //inizialise Vis.js
    draw();
    //load the global doc is from the URL
    queryStringFunction();
    //cast the JSON doc to the vis.js visualisation
    loadTopology();
}



/**
 * Triggered when we click on the button add Edge
 */
function onClickAddEdge() {
    network.addEdgeMode();
}

/**
 * Triggered when we click on the button add instance
 */
function onClickAddInstance() {
    var requestNode = new Object();
    requestNode.flavor = document.getElementById('instanceType').value;
    requestNode.image = document.getElementById('instanceImage').value;

    instanceAmount = document.getElementById('inputAmount').value;
    for (var i = 0; i < instanceAmount; i++) {
        requestNode.name = getRandomLabel();
        console.log(requestNode);

        $.ajax({
            type: "POST",
            async: false,
            url: BASE_URL + "doc/"+ DOCID + "/node",
            contentType: 'application/json;charset=utf-8',
            data: JSON.stringify(requestNode),
            dataType: 'json',
            success: function(data){
                var nodeId = Object.keys(data)[0];
                nodes.add( castNodeNet(data[nodeId], nodeId) );
            },
            error: function(error) {
                alert( "unable to add node:\n"+JSON.stringify(error) );
            }
        });
    }
    //close model of bootstrap
    $('#modelAddInstance').modal('toggle');
}

/**
 * Triggered when we click on the button add network
 */
function onClickAddNetwork() {
    var net = new Object();
    net.group = "net";
    net.addr = document.getElementById('netIP').value;
    net.name = getRandomLabel();

    $.ajax({
        type: "POST",
        url: BASE_URL + "doc/"+ DOCID + "/net",
        contentType: 'application/json;charset=utf-8',
        data: JSON.stringify( net ),
        dataType: 'json',
        success: function(data){
            var nodeId = Object.keys(data)[0];
            nodes.add( castNodeNet(data[nodeId], nodeId) );
        },
        error: function(error) {
            alert( "unable to add net:\n"+JSON.stringify(error) );
        }
    });


    if (!(net.addr == '0.0.0.0/0')) {
        $('select#netIP option[value=\'' + net.addr +'\']').remove();
    }
    $('#modelAddNetwork').modal('toggle');
}

/**
 * Triggered when we click on the button add delete
 */
function onClickSelectDelete() {
    var edgeObj = new Object();
    $.ajax({
        type: "DELETE",
        url: BASE_URL + "doc/"+ DOCID + "/vertex",
        contentType: 'application/json',
        data: JSON.stringify( network.getSelectedNodes() ),
        success: function(arrDeletedIds){
            for (var i=0; i<arrDeletedIds.length; i++) {
                nodes.remove(arrDeletedIds[i]);
            }
        },
        error: function(error) {
            alert( "unable to delete:\n"+JSON.stringify(error) );
        }
    });        

    network.getSelectedEdges().forEach(function (element) {
        edgeObj = edges.get(element);
        callEdgeDELETE(edgeObj);
    });
    //nodes.remove(network.getSelectedNodes());

    //don't show popups anymore
    closePopUp();

}

/**
 * Triggered when we click on the button play
 */
function onClickPlay() {
    console.log("Going to start ansible...");
    moveStepIndicatorOneStepForward('define', 'bootstrap');
    $('#button-add-connection').hide();
    $('#button-add-network').hide();
    $('#button-add-machine').hide();
    $('#button-delete-entity').hide();

    document.getElementById("play-button").style = "display: none";

    // var iaasProviderIsOpenStack = document.getElementById("save-credentials-button-aws").getComputedStyle('display');
    var iaasProviderIsOpenStack = isOpenStack;
    console.log("Provider is OpenStack: " + iaasProviderIsOpenStack);

    $.ajax({
        type: 'GET',
        url: BASE_URL + 'doc/' + DOCID + '/bootstrap/' + (iaasProviderIsOpenStack ? "os" : "aws"),
        contentType: 'application/json',
        success: function(data) {
            console.log(data);
            console.log("Started ansible successfully!");
            $('#destroy-button').show();
            moveStepIndicatorOneStepForward('bootstrap', 'assign');
        },
        error: function (error) {
            console.log(error);
            console.log("There went something wrong with ansible!");
        }
    });

    var doneMsg = "Ansible is done with the environment setup. Please call GET /doc/{docId}.";
    var pollAnsiblelog = function() {
            $.ajax({
            type: 'GET',
            url: BASE_URL + 'ansiblelog',
            contentType: 'application/json',
            success: function(data) {
                //!TODO not the message which ansible returns
                if (data.msg === doneMsg) {
                    //$('log-row').style = "display: none";
                    console.log("Bootstrapping done");
                    //make a request of the current document and cast the JSON -> vis.js
                    castAnsibleOutput();
					$('#iframe-ping-card').show();
                } else { //periodic poll
                    setTimeout(function() {
                        pollAnsiblelog();
                    }, 1000)
                }
            }
        })
    };
    pollAnsiblelog();
}


/**
 * Triggered when we click on the button play
 */
function onClickDestroy() {
    console.log("Going to start ansible for destroying setup...");
    moveStepIndicatorOneStepForward('assign', 'destroy');

    $('#destroy-button').hide();
    $('#play-button').show();

    // var iaasProviderIsOpenStack = document.getElementById("save-credentials-button-aws").getComputedStyle('display');
    var iaasProviderIsOpenStack = isVisible(document.getElementById("save-credentials-button-aws"));
    // console.log(iaasProviderIsOpenStack);

    console.log('DELETE ' + BASE_URL + 'doc/' + DOCID + '/destroy/' + (iaasProviderIsOpenStack ? "os" : "aws"));
    $.ajax({
        type: 'DELETE',
        url: BASE_URL + 'doc/' + DOCID + '/destroy/' + (iaasProviderIsOpenStack ? "os" : "aws"),
        contentType: 'application/json',
        success: function(data) {
            console.log(data);
            console.log("Started ansible successfully!");

            //make a request of the current document and cast the JSON -> vis.js
            removeTopology();
            $('#destroy-button').hide();
            $('#play-button').show();
            resetStepIndicator();
            moveStepIndicatorOneStepForward('login', 'define');
            moveStepIndicatorOneStepForward('define', 'bootstrap');
        },
        error: function (error) {
            console.log(error);
            console.log("There went something wrong while destroying the setup!");
        }
    });
}

function onClickShowLog() {
    //open logging.html in a new tab
    var win = window.open("http://" + hostIP + "/logging.html", '_blank');
    win.focus();

}

/**
 * Triggered when we click on the button save on the credentials card
 */
function saveServerCredentials() {
    SERVER_CRED.ssh_key_name   = document.getElementById("os_ssh_key_name").value;
    SERVER_CRED.external_network  = document.getElementById("external_network").value;
    //SERVER_CRED.mgmt_network_name = document.getElementById("mgmt_network_name").value;
    //SERVER_CRED.mgmt_network_name = "mgmt";
    SERVER_CRED.auth_url          = document.getElementById("auth_url").value;
    SERVER_CRED.username          = document.getElementById("username").value;
    SERVER_CRED.password          = document.getElementById("password").value;
    SERVER_CRED.project_name      = document.getElementById("project_name").value;
    //console.log(SERVER_CRED);
    isOpenStack=true;
    postYmlConfig(true); // true = iaasProviderIsOpenStack
}

/**
 * Save the AWS Credentials
 */
function saveAWSserverCredentials() {
    SERVER_CRED_AWS.ec2_access_key        = document.getElementById("ec2_access_key").value;
    SERVER_CRED_AWS.ec2_secret_access_key = document.getElementById("ec2_secret_access_key").value;
    SERVER_CRED_AWS.ec2_region            = document.getElementById("ec2_region").value;
    //SERVER_CRED_AWS.mgmt_network_name     = document.getElementById("mgmt_network_name_aws").value;
    //SERVER_CRED_AWS.mgmt_network_name     = "mgmt";
    SERVER_CRED_AWS.ssh_key_name          = document.getElementById("ssh_key_name").value;
    SERVER_CRED_AWS.ssh_user              = document.getElementById("ssh_user").value;
    // console.log(SERVER_CRED_AWS);
    isOpenStack=false;
    postYmlConfig(false); // false = iaasProviderIsOpenStack
}

function fillFlavorOptionsAWS() {
	var mappingURL = HOST_URL + "resources/aws_device_to_flavor_map.json";
	fillFlavorOptions(mappingURL);
}

function fillFlavorOptionsOS() {
	var mappingURL = HOST_URL + "resources/os_device_to_flavor_map.json";
	fillFlavorOptions(mappingURL);
}

function fillFlavorOptions(mappingURL) {
    $.ajax({
        url: mappingURL,
        type: 'GET',
		async: false,
		dataType: "json",
        success: function(response) {
			var selectbox = document.getElementById("instanceType");
			jQuery.each(response, function(device, properties) {
				var option = document.createElement("option");
				var flavor = properties.flavor;
				option.text = device + " (" + flavor + ")";
				selectbox.add(option);
			});
            return;
        }, error: function(error)  {
            console.log(error);
            return error;
        }
    });
}

function postYmlConfig(iaasProviderIsOpenStack) {
    var URL = BASE_URL + "yml-config";
    var CREDENTIALS;

    if (!iaasProviderIsOpenStack) {
        URL = URL + "/aws";
        CREDENTIALS = SERVER_CRED_AWS;
    } else {
        URL = URL + "/os";
        CREDENTIALS = SERVER_CRED;
    }

    console.log('POST ' + URL);
    // console.log(JSON.stringify(CREDENTIALS)); !!!

    $.ajax({
        type: "POST",
        url: URL,
        contentType: 'application/json',
        data: JSON.stringify(CREDENTIALS),
        dataType: 'application/json',
        success: function (data) {                                                  //
            // don't show card with credentials anymore                             //
            document.getElementById("cardCredentials").style = "display: none";     //
            document.getElementById("cardNetwork").style = "visibility: visible";   //
            moveStepIndicatorOneStepForward('login', 'define');                     //
        },                                                                          //
        error: function (error) {                                                   //
            var message = JSON.parse(error.responseText)['msg'];                    //
            //                                                                      V   (as done here)
            if(message == null) { // TODO this is hacky, but handles as an 'success'. By now, I don't get why this is an error...
                document.getElementById("cardCredentials").style = "display: none";
                document.getElementById("cardNetwork").style = "visibility: visible";
                moveStepIndicatorOneStepForward('login', 'define');
            }

            console.log('An error occurred: ' + message);
            console.log(error);
            // document.getElementById("cardCredentials").style = "display: none"; // comment out after testing!
            // document.getElementById("credentials-headline").innerText = message;
            $('#login-error-message').show();
            $('#login-error-message').text(message);
            $('#login-error-message-button').show();
        }
    });
}

/**
 * Destroy the current network Topologie from vis.js
 */
function removeTopology() {
    nodes.remove(nodes.getIds());
    edges.remove(edges.getIds());
}

/**
 * Add the output of a Net Response
 * to the vis.js network topologie
 *
 * @param nodeObj
 * @param nodeId
 */
function castNodeNet(nodeObj, nodeId) {
    nodeObj.label = nodeObj.name;
    if (nodeObj.icon == "net") {
        nodeObj.label = nodeObj.name+"\n"+nodeObj.addr;
    } 
    if (nodeObj.icon != "net") {
        var edge = nodeObj.edgesBack[ Object.keys(nodeObj.edgesBack)[0] ];
        if (edge != undefined) {
            nodeObj.addr = edge.addr;
            nodeObj.label = nodeObj.name+"\n"+nodeObj.addr;
        }
    } 

    nodeObj.font = nodeObj.cancelled ? {color: "red"} : {color: "#000"};
    nodeObj.group = nodeObj.icon;
    nodeObj.id = nodeId;
    return nodeObj;
}

function castEdge(edge, edgeFrom, edgeTo) {
    edge.from = edgeFrom;
    edge.to = edgeTo;
    edge.arrows = "to";
    edge.id = edgeFrom + "-" + edgeTo;
    edge.label = "delay:" + edge.delay; //casteNodeEdgeCreateLabel(edge);
    edge.color = edge.cancelled ? {color: "red", highlight: "orange"} : {color: "#000"};
    edge.dashes = edge.cancelled;
    //color: BLACK,
    //font: {align: 'top'},
    //smooth: false,
    //arrows: "to"
    return edge;
}

/**
 * Make a Request and get the whole Document = all nodes,edges and nets
 * After that cast the output -> vis.js
 * This is the main controller for casting the ansible output JSON object and adding it to vis.js
 */
function castAnsibleOutput() {
    loadTopology();
}

/**
 * This Function loads the Document with the global docid in the Topology
 */
function loadTopology() {
    //remove the current one
    removeTopology();

    $.ajax({
        url: BASE_URL + "doc" + "/"+DOCID,
        async: false,
        dataType: 'json',
        type: 'GET',
        success: function(doc) {
            // add all Nets to the Visualisation
            for (var nodeId in doc.allNets) {
                nodes.add( castNodeNet(doc.allNets[nodeId], nodeId) );
            }
            // add all Nodes to the Visualisation
            for (var nodeId in doc.allNodes) {
                nodes.add( castNodeNet(doc.allNodes[nodeId], nodeId) );
            }
            // add all Edges from Nodes to the Visualisation
            for (var nodeId in doc.allNodes) {
                // nodeId is the id "to the node"
                var edgeTo = nodeId;
                var edgeKeys = Object.keys(doc.allNodes[nodeId].edgesBack);
                for (var i=0; i<edgeKeys.length; i++) {
                    var edgeFrom = Object.keys(doc.allNodes[nodeId].edgesBack)[i];
                    edge = doc.allNodes[nodeId].edgesBack[ edgeFrom ];
                    console.log("from:" + edgeFrom + " To:" + edgeTo);
                    console.log(edge);                    
                    edges.add( castEdge(edge, edgeFrom, edgeTo) );
                }
            }
            // add all Edges from Nets to the Visualisation
            // override current value to prevent miss calculations
            for (var nodeId in doc.allNets) {
                var edgeTo = nodeId;
                var edgeKeys = Object.keys(doc.allNets[nodeId].edgesBack);
                for (var i=0; i<edgeKeys.length; i++) {
                    var edgeFrom = Object.keys(doc.allNets[nodeId].edgesBack)[i];
                    edge = doc.allNets[nodeId].edgesBack[ edgeFrom ];
                    console.log("from:" + edgeFrom + " To:" + edgeTo);
                    console.log(edge);                    
                    edges.add( castEdge(edge, edgeFrom, edgeTo) );
                }                
            }            
        }, 
        error: function(error)  {
            alert( "unable to load document "+DOCID+":\n"+JSON.stringify(error) );
        }
    });
}

/**
 * Identify an Object by the click
 * @param params
 */
function castVertex(params) {
    if (params.nodes.length === 0 && params.edges.length > 0) {
        edgePopUp(params);
    } else if (params.nodes.length > 0) {
        nodePopUp(params);
    } else if (params.nodes.length === 0 && params.edges.length === 0) {
        closePopUp(params);
    }
}

/**
 * Show the Popup of a node
 * @param params
 */
function edgePopUp(params) {
    $('#popupNode').hide();
    var relatedContainerLeft = document.getElementById("mynetwork").offsetLeft;
    var edgeObj = edges.get(params.edges[0]);
    console.log("edge selected");
    console.log(edgeObj);
    document.getElementById("edgeFrom").value = edgeObj.from;
    document.getElementById("edgeTo").value = edgeObj.to;
    document.getElementById("edgeId").value = edgeObj.id;
    document.getElementById("edgeDelay").value = edgeObj.delay;
    document.getElementById("edgeInRate").value = edgeObj.in_rate;
    document.getElementById("edgeOutRate").value = edgeObj.out_rate;
    document.getElementById("edgeDispersion").value = edgeObj.dispersion;
    document.getElementById("edgeLoss").value = edgeObj.loss;
    document.getElementById("edgeCorrupt").value = edgeObj.corrupt;
    document.getElementById("edgeReorder").value = edgeObj.reorder;
    document.getElementById("edgeDuplicate").value = edgeObj.duplicate;
    $('#popupEdge').css('top', params.pointer.DOM.y - 57);
    $('#popupEdge').css('left', params.pointer.DOM.x + relatedContainerLeft);
    $('#popupEdge').addClass('show');
    $('#popupEdge').show();
}

/**
 * Show Node Popup
 * @param params
 */
function nodePopUp(params) {
    var nodeObj = nodes.get(params.nodes[0]);
    var relatedContainerLeft = document.getElementById("mynetwork").offsetLeft;
    $('#popupEdge').hide();
    $('#popupNode').css('top', params.pointer.DOM.y + 50);
    $('#popupNode').css('left', params.pointer.DOM.x + relatedContainerLeft);

    console.log("node selected");
    // Enable for debbuging
    // console.log(nodes.get(params.nodes[0]));
    document.getElementById("nodeID").value = nodeObj.id;
    document.getElementById("nodeName").value = nodeObj.name;
    document.getElementById("nodeAddr").value = nodeObj.addr;
    document.getElementById("nodeFlavor").value = nodeObj.flavor;
    document.getElementById("nodeImage").value = nodeObj.image;
    $('#popupNode').addClass('show');
    $('#popupNode').show();
}

/**
 * Close all PopUps
 * @param params
 */
function closePopUp(params) {
    console.log("nothing selected");
    $('#popupEdge').hide();
    $('#popupNode').hide();
}

/**
 * Triggered when the user clicks edit in the edge Popup Window
 */
function onClickEditEdge() {
    if ($("input[id='edgeDelay']")[0].readOnly === true) {
        document.getElementById("editEdge").innerHTML = "<i class='fas fa-check'></i>Done";
        setReadOnlyEdge(false);
    } else {
        $.ajax({
            type: "PUT",
            url: BASE_URL + "doc/"+ DOCID + "/edge/" + $("#edgeFrom").val() + "/" + $("#edgeTo").val(),
            async: false,
            contentType: 'application/json;charset=utf-8',
            data: JSON.stringify( castEdgePopUpFormToRequest() ),
            success: function(vertices) {
                castEdgePopUpFormToVisJS();
            }, 
            error: function(error) {
                alert(JSON.stringify(error));
            }
        });
        
        document.getElementById("editEdge").innerHTML = "<i class='far fa-edit'></i>Edit";
        setReadOnlyEdge(true);
    }
}
/**
 * Triggered when the user clicks node in the edge Popup Window
 */
function onClickEditNode() {
    if ($("input[id='nodeName']")[0].readOnly === true) {
        document.getElementById("editNode").innerHTML = "<i class='fas fa-check'></i>Done";
        setReadOnlyNode(false);
    } else {
        var nodeObj = nodes.get( $('input[id="nodeID"]').val() );
        //nodeObj.flavor = nodeObj.group;
        nodeObj.name = $('#nodeName').val();

        $.ajax({
            type: "PUT",
            url: BASE_URL + "doc/"+ DOCID + "/node/" + $('input[id="nodeID"]').val(),
            contentType: 'application/json;charset=utf-8',
            async: false,
            data: JSON.stringify( nodeObj ),
            dataType: 'json',
            success: function(vertices){
                var nodeId = Object.keys(vertices)[0];
                nodes.update( castNodeNet( vertices[nodeId], nodeId ) );
            },
            error: function(error) {
                alert("unable to edit node/net:\n"+JSON.stringify(error));
            }
        });

        document.getElementById("editNode").innerHTML = "<i class='far fa-edit'></i>Edit";
        setReadOnlyNode(true);
    }
}
/**
 * Triggered when the user clicks in the node Popup Window at the disable button
 */
function onClickDeactivateNode(){
    var nodeid = document.getElementById("nodeID").value;
    var nodeObj = nodes.get(nodeid);

    myData = "{\"cancelled\":\"true\"}";
    if (nodeObj.cancelled == true) { 
        myData = "{\"cancelled\":\"false\"}";
    }
    
    $.ajax({
        type: "PUT",
        url: BASE_URL + "doc/"+ DOCID + "/node/" + nodeid,
        contentType: 'application/json;charset=utf-8',
        async: false,
        data: myData,
        dataType: 'json',
        success: function(data){
            castNodeNet(data[nodeid], nodeid);
            nodes.update( data[nodeid] );
        },            
        error: function(error) {
            alert("unable to cancel node:\n"+JSON.stringify(error));
        }
    });
    closePopUp();
}
//blabla
function onClickDeactivateEdge(){
    var edgeFrom = $("#edgeFrom").val();
    var edgeTo = $("#edgeTo").val();
    var edge = edges.get(edgeFrom+"-"+edgeTo);
    
    myData = "{\"cancelled\":\"true\"}";
    if (edge.cancelled == true) { 
        myData = "{\"cancelled\":\"false\"}";
    }
    
    $.ajax({
        type: "PUT",
        url: BASE_URL + "doc/"+ DOCID + "/edge/" + edgeFrom + "/" + edgeTo,
        contentType: 'application/json;charset=utf-8',
        async: false,
        data: myData,
        dataType: 'json',
        success: function(data) {
            //alert(JSON.stringify(data))
            edges.update( castEdge(data[edgeTo].edgesBack[edgeFrom], edgeFrom, edgeTo) );
        },            
        error: function(error) {
            alert("unable to cancel node:\n"+JSON.stringify(error));
        }
    });
    closePopUp();   
}

function castEdgePopUpFormToVisJS() {
    var edgeObj = edges.get($("#edgeId").val());
    edgeObj.label = "Delay:"+$("#edgeDelay").val();
    edgeObj.delay = $("#edgeDelay").val();
    edgeObj.in_rate = $("#edgeInRate").val();
    edgeObj.out_rate = $("#edgeOutRate").val();
    edgeObj.dispersion = $("#edgeDispersion").val();
    edgeObj.loss = $("#edgeLoss").val();
    edgeObj.corrupt = $("#edgeCorrupt").val();
    edgeObj.reorder = $("#edgeReorder").val();
    edgeObj.duplicate = $("#edgeDuplicate").val();
    edges.update(edgeObj);
}

function castEdgePopUpFormToRequest() {
    var edgeProperties = new Object();
    edgeProperties.delay = $("#edgeDelay").val();
    edgeProperties.in_rate = $("#edgeInRate").val();
    edgeProperties.out_rate = $("#edgeOutRate").val();
    edgeProperties.dispersion = $("#edgeDispersion").val();
    edgeProperties.loss = $("#edgeLoss").val();
    edgeProperties.corrupt = $("#edgeCorrupt").val();
    edgeProperties.reorder = $("#edgeReorder").val();
    edgeProperties.duplicate = $("#edgeDuplicate").val();
    return edgeProperties;
}

/**
 * enable readonly of input field
 */
function setReadOnlyEdge(booleanValue) {
    $("input[id='edgeDelay']").attr("readonly", booleanValue);
    $("input[id='edgeInRate']").attr("readonly", booleanValue);
    $("input[id='edgeOutRate']").attr("readonly", booleanValue);
    $("input[id='edgeDispersion']").attr("readonly", booleanValue);
    $("input[id='edgeLoss']").attr("readonly", booleanValue);
    $("input[id='edgeCorrupt']").attr("readonly", booleanValue);
    $("input[id='edgeReorder']").attr("readonly", booleanValue);
    $("input[id='edgeDuplicate']").attr("readonly", booleanValue);
}
/**
 * enable readonly of input field
 */
function setReadOnlyNode(booleanValue) {
    $("input[id='nodeName']").attr("readOnly", booleanValue);
}


function isVisible (ele) {
    return  ele.clientWidth !== 0 &&
        ele.clientHeight !== 0 &&
        ele.style.opacity !== 0 &&
        ele.style.visibility !== 'hidden';
}

function moveStepIndicatorOneStepForward(stepFrom, stepTo) {
    $('#step-' + stepFrom).removeClass('active').addClass('complete').css('font-weight', 'Normal');
    $('#step-' + stepTo).removeClass('disabled').addClass('active').css('font-weight', 'Bold');
}

function resetStepIndicator() {
    var steps = ['define', 'bootstrap', 'assign', 'destroy'];
    steps.forEach(function(step) {
        $('#step-' + step).removeClass('complete').removeClass('active').addClass('disabled').css('font-weight', 'Normal');
    });
    $('#step-login').addClass('active').css('font-weight', 'Bold');
}

