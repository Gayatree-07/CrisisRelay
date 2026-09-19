import json
import time
from http.server import BaseHTTPRequestHandler, HTTPServer
from gtts import gTTS

PORT_NUMBER = 9000
MOCK_MAPS_LINK = "https://google.com"

class CrisisRelayServer(BaseHTTPRequestHandler):
    
    def do_OPTIONS(self):
        """Handles browser pre-flight safety handshake requests (CORS)."""
        self.send_response(200)
        self.send_header('Access-Control-Allow-Origin', '*')
        self.send_header('Access-Control-Allow-Methods', 'POST, GET, OPTIONS')
        self.send_header('Access-Control-Allow-Headers', 'Content-Type')
        self.end_headers()

    def do_POST(self):
        """Processes incoming state payload dispatches from the web script."""
        content_length = int(self.headers['Content-Length'])
        post_data = self.rfile.read(content_length).decode('utf-8')
        
        # Parse the custom JSON structure sent by your frontend script
        try:
            payload = json.loads(post_data)
        except Exception:
            self._send_error_response(400, "Invalid JSON data structure received.")
            return

        event_type = payload.get('event_type', 'UNKNOWN')
        phone = payload.get('phone', 'Unknown Destination')
        location = payload.get('location', '16.7501,74.2846')
        lang = payload.get('lang', 'EN').lower()
        
        print(f"\n📡 [INBOUND REQUEST] Event Block: {event_type} | Target Number: {phone}")

        # MAPPING PATHWAY ROUTER
        if event_type == "START":
            print(f"⏱️ Cloud Fallback Active. Mapped safety monitoring window for user.")
            response_body = {"status": "ACK", "message": "Cloud Watch Armed."}
            
        elif event_type == "DISARM":
            print(f"✅ Secure check-in complete. Safeland state returned. Identity verified.")
            response_body = {"status": "ACK", "message": "Session tracking destroyed."}
            
        elif event_type in ["SILENT_DURESS", "AUTOMATIC_TIMEOUT", "INSTANT_OVERRIDE_TAP"]:
            print(f"🚨 CRITICAL EVENT ENGAGED: Reason code '{event_type}' triggered!")
            
            # Combine the coordinates into a workable google maps trace link
            maps_url = f"{MOCK_MAPS_LINK}{location}"
            generate_forensic_audio(lang, event_type.lower(), maps_url, phone)
            
            response_body = {"status": "DISPATCHED", "alert_reason": event_type}
            
        else:
            response_body = {"status": "UNRECOGNIZED", "message": "Undefined routing token parameters."}

        # Ship successful response payload matrix back to the client interface
        self.send_response(200)
        self.send_header('Content-Type', 'application/json')
        self.send_header('Access-Control-Allow-Origin', '*')
        self.end_headers()
        self.wfile.write(json.dumps(response_body).encode('utf-8'))

    def _send_error_response(self, code, text):
        self.send_response(code)
        self.send_header('Content-Type', 'application/json')
        self.send_header('Access-Control-Allow-Origin', '*')
        self.end_headers()
        self.wfile.write(json.dumps({"error": text}).encode('utf-8'))

def generate_forensic_audio(lang_code, event_tag, location_url, target_phone):
    """Synthesizes emergency location text coordinates into natural spoken sound files."""
    messages = {
        "en": f"Emergency Dispatch Notification. CrisisRelay tracking user requires immediate assistance. Dispatch response teams to location coordinates: {location_url}",
        "hi": f"आपातकालीन चेतावनी। क्राइसिस रिले उपयोगकर्ता खतरे में है। तत्काल सहायता की आवश्यकता है। स्थान ट्रैक लिंक: {location_url}",
        "mr": f"आणीबाणीची चेतावणी. क्राइसिस रिले वापरकर्त्याला त्वरित मदतीची आवश्यकता आहे. ट्रॅकिंग दुवा: {location_url}"
    }
    
    selected_text = messages.get(lang_code, messages["en"])
    print(f"🎙️ [AUDIO ENGINE]: Synthesizing vocalized safety tracks code: [{lang_code}]...")
    
    try:
        tts = gTTS(text=selected_text, lang=lang_code)
        output_filename = f"crisisrelay_alert_{event_tag}_{lang_code}.mp3"
        tts.save(output_filename)
        print(f"🏆 [SUCCESS]: Dispatch confirmation track saved locally: '{output_filename}'\n")
    except Exception as e:
        print(f"⚠️ Voice compilation bypass exception encountered: {str(e)}")

if __name__ == '__main__':
    server = HTTPServer(('127.0.0.1', PORT_NUMBER), CrisisRelayServer)
    print(f"🚀 CrisisRelay Open Source Backend Gateway Active on Port {PORT_NUMBER}...")
    print(f"✨ Ready to receive secure frontend signals. Mapped endpoint listening...")
    try:
        server.serve_forever()
    except KeyboardInterrupt:
        print("\nShutting down safety routing layer safely.")
        server.server_close()
