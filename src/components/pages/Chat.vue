<template>
    <main class="login-form">
    <div class="cotainer">
        <div class="row justify-content-center">
            <div class="col-md-8">
                <div class="card">
                    <div class="card-header">{{contact.userData.name}}</div>
                      <div class="card-body">
                        <div class="row">
                          <Sidebar :sessions="sessions"></Sidebar>
                          <div class="col-md-9">

                                <div class="chat-wrapper" id="chat-wrapper-box" ref="chatWrapperBox">
                                    <ul class="chat-list">
                                        <li class="chat-list-item" v-for="message in sessionMessages" :key="message.id">
                                            <div class="box" :class="message.party == 'self' ? 'sb4' : 'sb3'">{{message.content}}</div>
                                        </li>
                                    </ul>
                                </div>
                                <p v-if="contactActivities.isTyping" style="text-align:left">{{ contact.userData.name }} is typing...</p>

                                <br>
                             
                                <div class="form-group">
                                    <textarea v-model="message" @input="emitUserTyping" v-on:keyup.enter="sendMessage" class="form-control" id="exampleFormControlTextarea1" rows="3" placeholder="Type your message here and hit enter..."></textarea>
                                </div>
                             
                          </div>
                        </div>
                      </div>
                </div>
            </div>
        </div>
    </div>
</main>
</template>

<style scoped>
    .chat-wrapper{
        max-height: 600px;
        overflow-y: scroll;
        display: flex;
        flex-direction: column-reverse
    }
    ::-webkit-scrollbar {
        width: 0px;  /* Remove scrollbar space */
        background: transparent;  /* Optional: just make scrollbar invisible */
    }
    /* Optional: show position indicator in red */
    ::-webkit-scrollbar-thumb {
        background: #FF0000;
    }

.chat-list {
  list-style-type: none;
  padding-left: 0px;
}

.box {
  width: 300px;
  margin: 50px auto;
  background: #00bfb6;
  padding: 20px;
  text-align: center;
  position: relative;
  border-radius: 25px;
}

.sb3{
    margin-left: 0px;
    background:#ceeef3;
    color: #666666;
    text-align: left;
}

.sb4{
    margin-right: 0px;
    background:#0d9fc4;
    color: #ffffff;
    text-align: left;
}

.sb3:before {
  content: "";
  width: 0px;
  height: 0px;
  position: absolute;
  border-left: 10px solid #ceeef3;
  border-right: 10px solid transparent;
  border-top: 10px solid #ceeef3;
  border-bottom: 10px solid transparent;
  left: 19px;
  bottom: -19px;
}

.sb4:before {
  content: "";
  width: 0px;
  height: 0px;
  position: absolute;
  border-left: 10px solid transparent;
  border-right: 10px solid #0d9fc4;
  border-top: 10px solid #0d9fc4;
  border-bottom: 10px solid transparent;
  right: 19px;
  bottom: -19px;
}


</style>

<script>

  import Sidebar from '../../components/Sidebar.vue'
  export default {
    name: 'Chat',
    components: {
      Sidebar
    },
    data: () => ({
        sessions:[],
        selectedSession: null,
        sessionMessages: [],
        message:null,
        isConnected: false,
        socketMessage: '',
        contact: {
          userData: {
            id:null,
            name:null
          }
        },
        contactActivities:{
            isTyping:false
        }
    }),


      sockets: {
        connect() {
          // Fired when the socket connects.
          this.isConnected = true;
        },

        disconnect() {
          this.isConnected = false;
        },

        // Fired when the server sends something on the "messageChannel" channel.
        userChat() {
          this.getMessages();
          this.contactActivities.isTyping = false;
        },

        userTyping() {
          this.contactActivities.isTyping = true;
        }
      },

    
    methods: {
        getSessions(){
          this.$store.dispatch("GET_SESSIONS").then(result => {
            this.sessions = result.data.sessions;
          }).catch(error => {
            console.log("Error loading sessions: "+error.response.data.message);
          });
        },

        sendMessage(){
            this.$store.dispatch("SEND_MESSAGE", {
                sessionId: this.selectedSession,
                content: this.message
            }).then(result => {

                var element = this.$refs["chatWrapperBox"];
                element.scrollTop = element.scrollHeight;

                this.emitUserSendMessage();

                this.message = null;
                console.log(result);
                this.getMessages();
            }).catch(error => {
                console.log(error.response.data);
            });
        },

        getMessages(){
            this.$store.dispatch("GET_MESSAGES", this.selectedSession).then(result => {
                console.log(result.data.data.messages);
                this.sessionMessages = result.data.data.messages;
                this.contact = result.data.data.contact;
            }).catch(error => {
                console.log(error);
            });
        },

        emitUserComeOnline(){
          this.$socket.emit('userOnline', this.$store.getters.GET_USERDATA.id);
        },

        emitUserSendMessage(){
          this.$socket.emit('userChat', this.contact.userId, this.$store.getters.GET_USERDATA.id);
        },

        emitUserTyping(){
          this.$socket.emit('userTyping', this.contact.userId);
        }


    },

     beforeMount(){
        
        this.selectedSession = this.$route.params.id;
        this.getSessions();
     },

     mounted(){
        this.selectedSession = this.$route.params.id;
        this.getMessages();

        var element = this.$refs["chatWrapperBox"];
        element.scrollTop = element.scrollHeight;


     },

     created: function() {
        this.selectedSession = this.$route.params.id;
        this.getMessages();
        this.emitUserComeOnline();
     },

     watch: {
        'contactActivities.isTyping' : function(){
          setTimeout(() => { 
            console.log("FALSe");
            this.contactActivities.isTyping = false;
          }, 5000);
        }
    }

  }
</script>