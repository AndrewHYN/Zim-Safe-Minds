export type Language = "en" | "sn" | "nd";
export const languages: {id:Language; name:string; local:string; welcome:string}[] = [
 {id:"sn",name:"Shona",local:"ChiShona",welcome:"Unogamuchirwa"},
 {id:"nd",name:"Ndebele",local:"isiNdebele",welcome:"Siyakwamukela"},
 {id:"en",name:"English",local:"English",welcome:"You're welcome here"}
];
export const LANGUAGE_KEY="zsm.language.v1";
export function readLanguage():Language|null {
 try {const v=localStorage.getItem(LANGUAGE_KEY);return v==="en"||v==="sn"||v==="nd"?v:null;} catch{return null;}
}
export function saveLanguage(lang:Language) {
 try{localStorage.setItem(LANGUAGE_KEY,lang);}catch{/* browsing still works */}
 document.documentElement.lang=lang==="sn"?"sn":lang==="nd"?"nd":"en";
}
/**
 * UI translations are editorial drafts requiring native-speaker review before a clinical pilot.
 * Non-clinical demo only. Unsupported text remains English instead of inventing medical translations.
 */
const shona:Record<string,string>={
 "Talk":"Taura","Learn":"Dzidza","Connect":"Batanidza","Sign in":"Pinda","Create account":"Gadzira akaundi","My account":"Akaundi yangu","Sign out":"Buda","Language":"Mutauro","Change language":"Chinja mutauro","Continue":"Enderera","Back":"Dzokera","Close":"Vhara",
 "Choose your language":"Sarudza mutauro wako","Choose how you'd like to use Zim Safe Minds. You can change this at any time.":"Sarudza mutauro waunoda kushandisa paZim Safe Minds. Unogona kuuchinja chero nguva.",
 "A safe space to talk. A path to real support.":"Nzvimbo yakasununguka yekutaura. Nzira yekuwana rubatsiro rwevanhu.",
 "You belong here.":"Unogamuchirwa pano.","A calmer beginning.":"Kutanga kune runyararo.","Continue in":"Enderera ne",
 "Welcome back.":"Wadzoka, tinokugamuchira.","Your space starts here.":"Nzvimbo yako inotangira pano.",
 "Create a quiet corner of your own.":"Gadzira nzvimbo yako ine runyararo.","Sign in to your space.":"Pinda munzvimbo yako.",
 "Display name":"Zita raunoda kuratidza","Email address":"Kero yeemail","Password":"Pasiwedhi","At least 8 characters":"Mavara masere kana kupfuura","Show":"Ratidza","Hide":"Viga","Forgot password?":"Wakanganwa pasiwedhi?",
 "I am 18 or older.":"Ndine makore 18 kana kupfuura.","Account details only. We do not save your chat messages to your profile.":"Mashoko eakaundi chete. Hatichengeti mameseji ekukurukurirana muprofile yako.",
 "Continue as a guest":"Enderera semuenzi","No account needed to explore.":"Haufaniri kuva neakaundi kuti uongorore.","Already have an account?":"Watova neakaundi here?","New here?":"Uri mutsva pano?",
 "Accounts aren't active yet. You can explore without signing in.":"Maakaundi haasati ashanda. Unogona kuongorora usina kupinda.","Check your email to confirm your account.":"Tarisa email yako kuti usimbise akaundi.","Email sent. Follow the password reset link.":"Email yatumirwa. Shandisa link yekuchinja pasiwedhi.","Please enter your email address.":"Nyora kero yeemail.","Please confirm you are 18 or older.":"Simbisa kuti une makore 18 kana kupfuura.",
 "Need urgent help?":"Unoda rubatsiro rwechimbichimbi?","Help right now":"Rubatsiro ikozvino","Afterglow":"Afterglow","Daylight":"Masikati",
 "A SAFER FIRST STEP STARTS HERE":"DANHO ROKUTANGA RAKACHENGETEKA","It's okay to ":"Hazvina kuipa ","not feel okay.":"kusanzwa zvakanaka.","Some conversations are hard to begin. We’re making it easier to express what’s on your mind, discover mental-health resources, and reach real people when you choose.":"Dzimwe nyaya dzinonetsa kutanga. Tinokubatsira kutaura zviri mumwoyo, kuwana ruzivo rweutano hwepfungwa, uye kubatana nevanhu vanogona kubatsira kana wagadzirira.",
 "Try guided conversation":"Edza hurukuro inotungamirirwa","Find human support":"Tsvaga rubatsiro rwevanhu","Youth-first":"Vechidiki pakutanga","Your choice":"Sarudzo yako","Human care matters":"Rubatsiro rwevanhu runokosha",
 "Early prototype: today's conversation is scripted, not connected to a live AI or clinician.":"Uyu muenzaniso wekutanga: hurukuro yakanyorwa kare, haisi AI inoshanda kana chiremba.",
 "Your space":"Nzvimbo yako","Reflect · Explore · Reach out":"Fungisisa · Ongorora · Taura","THERE IS NO PERFECT WAY TO START":"HAPANA NZIRA IMWE YOKUTANGA","One step at a time":"Danho rimwe panguva","No pressure. No judgment.":"Hapana kumanikidzwa kana kutongwa.",
 "THE CONVERSATION · INTERACTIVE PREVIEW":"HURUKURO · MUENZANISO UNOSHANDA","Your space to ":"Nzvimbo yako ","talk it through.":"yokukurukura.","Here is the real, working conversation demo. Pick a starter or write a message. You're in control, and you can move to human support whenever you choose.":"Uyu muenzaniso wehurukuro unoshanda. Sarudza pekutanga kana nyora meseji. Iwe unosarudza nguva yokutsvaga rubatsiro rwevanhu.",
 "Let's talk.":"Ngatitaure.","Your guided reflection space":"Nzvimbo yokufungisisa","A space to be heard.":"Nzvimbo yokuteererwa.","You can start with a prompt or write something yourself.":"Unogona kusarudza mubvunzo kana kunyora wega.","Clear":"Bvisa","Start":"Tanga",
 "Type your message here…":"Nyora meseji yako pano…","Tap here to begin talking…":"Baya pano kuti utange kutaura…",
 "Messages stay in this tab; they are not sent to a clinician.":"Mameseji anoramba mutabhu ino; haatumirwi kuna chiremba.","Not live AI or therapy. Review the demo disclosure before chatting.":"Haisi AI kana kurapwa chaiko. Verenga tsananguro usati wataura.",
 "SUPPORT BEYOND THE CONVERSATION":"RUBATSIRO RWAKAWANDA","There is no ":"Hapana ","single right way":"nzira imwe chete"," to begin.":" yokutanga.","Take a quiet moment, explore trusted information, or move directly toward human support. You're always in control.":"Zorora, verenga ruzivo rwakavimbika, kana kutsvaga rubatsiro rwevanhu. Sarudzo ndeyako.",
 "Take a pause":"Zorora zvishoma","Explore awareness":"Dzidza zvakawanda","Reach real support":"Tsvaga rubatsiro",
 "Finish":"Pedza","Next step":"Danho rinotevera","Done":"Zvaitwa","Not now":"Kwete izvozvi","I understand · Continue":"Ndanzwisisa · Enderera",
 "BEFORE YOU BEGIN":"USATI WATANGA","Your comfort comes first.":"Kugadzikana kwako kunokosha.","For adults 18+ only. You can skip this and visit Connect instead.":"Kuvanhu vane makore 18 zvichikwira chete. Unogona kusvetuka izvi woenda paBatanidza.",
 "IMMEDIATE SUPPORT":"RUBATSIRO RWECHIMBICHIMBI","Please seek real help now.":"Tsvaga rubatsiro rwevanhu izvozvi.","Close guidance":"Vhara mashoko",
 "Explore":"Ongorora","Important":"Zvakakosha","Urgent help":"Rubatsiro rwechimbichimbi","Independent support":"Rubatsiro rwakazvimirira","Not therapy or a crisis service":"Haisi sevhisi yekurapa kana rubatsiro rwechimbichimbi",
 "THE LIBRARY":"RAIBHURARI","Take what you need today.":"Tora ruzivo rwaunoda nhasi.","Search the library…":"Tsvaga muraibhurari…","Read more":"Verenga zvimwe","Save":"Chengeta","Saved":"Zvachengetwa","Read the story":"Verenga nyaya","Find real support":"Tsvaga rubatsiro rwevanhu",
 "Real people. ":"Vanhu chaivo. ","Real support.":"Rubatsiro chairwo.","Your choice.":"Sarudzo yako.","Explore your options and prepare to make that first contact. You never have to share a chat transcript to look for help.":"Ongorora sarudzo dzako uye gadzirira kutaura nemunhu. Haufaniri kugovera hurukuro yako kuti utsvage rubatsiro.",
 "How would you like to connect?":"Ungada kubatana sei?","What about affordability?":"Mutengo unokukwanira sei?","Which language works for you?":"Unoda mutauro upi?","Preferred language":"Mutauro waunoda",
 "View options":"Ona sarudzo","Copy my preferences (not chat text)":"Kopa zvandasarudza (kwete hurukuro)"
};
const ndebele:Record<string,string>={
 "Talk":"Khuluma","Learn":"Funda","Connect":"Xhumana","Sign in":"Ngena","Create account":"Vula i-akhawunti","My account":"I-akhawunti yami","Sign out":"Phuma","Language":"Ulimi","Change language":"Tshintsha ulimi","Continue":"Qhubeka","Back":"Buyela emuva","Close":"Vala",
 "Choose your language":"Khetha ulimi lwakho","Choose how you'd like to use Zim Safe Minds. You can change this at any time.":"Khetha ulimi ofuna ukulusebenzisa kuZim Safe Minds. Ungalutshintsha loba nini.",
 "A safe space to talk. A path to real support.":"Indawo ephephileyo yokukhuluma. Indlela eya ekusekelweni ngabantu.",
 "You belong here.":"Wamukelekile lapha.","A calmer beginning.":"Ukuqala ngokuthula.","Continue in":"Qhubeka ngo",
 "Welcome back.":"Siyakwamukela futhi.","Your space starts here.":"Indawo yakho iqala lapha.",
 "Create a quiet corner of your own.":"Zenzele indawo yokuthula.","Sign in to your space.":"Ngena endaweni yakho.",
 "Display name":"Ibizo ozalibonisa","Email address":"Ikheli le-imeyili","Password":"Iphasiwedi","At least 8 characters":"Izinhlamvu ezingu-8 kumbe ezedlula","Show":"Veza","Hide":"Fihla","Forgot password?":"Ukhohlwe iphasiwedi?",
 "I am 18 or older.":"Ngineminyaka engu-18 kumbe edlula.","Account details only. We do not save your chat messages to your profile.":"Imininingwane ye-akhawunti kuphela. Asigcini imilayezo yakho yengxoxo kuphrofayili.",
 "Continue as a guest":"Qhubeka njengesivakashi","No account needed to explore.":"Akudingeki i-akhawunti ukuze uhlole.","Already have an account?":"Usuvele ule-akhawunti?","New here?":"Umusha lapha?",
 "Accounts aren't active yet. You can explore without signing in.":"Ama-akhawunti awakasebenzi. Ungahlola ungangenanga.","Check your email to confirm your account.":"Hlola i-imeyili yakho ukuze uqinisekise i-akhawunti.","Email sent. Follow the password reset link.":"I-imeyili ithunyelwe. Landela isixhumanisi sokutshintsha iphasiwedi.","Please enter your email address.":"Faka ikheli le-imeyili.","Please confirm you are 18 or older.":"Qinisekisa ukuthi uleminyaka engu-18 kumbe edlula.",
 "Need urgent help?":"Udinga usizo oluphuthumayo?","Help right now":"Usizo khathesi","Afterglow":"Afterglow","Daylight":"Imini",
 "A SAFER FIRST STEP STARTS HERE":"ISINYATHELO SOKUQALA ESIPHEPHILEYO","It's okay to ":"Kulungile ","not feel okay.":"ukungazizwa kuhle.","Some conversations are hard to begin. We’re making it easier to express what’s on your mind, discover mental-health resources, and reach real people when you choose.":"Ezinye ingxoxo kunzima ukuziqalisa. Sikunceda ukukhuluma okusenhliziyweni yakho, ukuthola ulwazi ngempilo yengqondo, lokufinyelela abantu abangakusekela nxa usulungile.",
 "Try guided conversation":"Zama ingxoxo eqondiswayo","Find human support":"Thola usizo lwabantu","Youth-first":"Intsha kuqala","Your choice":"Ukukhetha kwakho","Human care matters":"Ukunakekelwa ngabantu kuqakathekile",
 "Early prototype: today's conversation is scripted, not connected to a live AI or clinician.":"Lo ngumfanekiso wokuqala: ingxoxo ilungiswe ngaphambili, ayisiyo AI ephilayo kumbe uchwepheshe wezempilo.",
 "Your space":"Indawo yakho","Reflect · Explore · Reach out":"Cabanga · Hlola · Khuluma","THERE IS NO PERFECT WAY TO START":"AKULANDLELA EYODWA YOKUQALISA","One step at a time":"Isinyathelo esisodwa ngesikhathi","No pressure. No judgment.":"Akula kucindezelwa kumbe ukwahlulelwa.",
 "THE CONVERSATION · INTERACTIVE PREVIEW":"INGXOXO · UMFANEKISO OSEBENZAYO","Your space to ":"Indawo yakho ","talk it through.":"yokukhuluma.","Here is the real, working conversation demo. Pick a starter or write a message. You're in control, and you can move to human support whenever you choose.":"Nanku umfanekiso wengxoxo osebenzayo. Khetha lapho ozoqala khona kumbe ubhale umlayezo. Nguwe okhethayo isikhathi sokufuna usizo lwabantu.",
 "Let's talk.":"Asikhulume.","Your guided reflection space":"Indawo yokucabangisisa","A space to be heard.":"Indawo yokulalelwa.","You can start with a prompt or write something yourself.":"Ungaqala ngombuzo kumbe uzibhalele.","Clear":"Sula","Start":"Qalisa",
 "Type your message here…":"Bhala umlayezo wakho lapha…","Tap here to begin talking…":"Thinta lapha ukuze uqale ukukhuluma…",
 "Messages stay in this tab; they are not sent to a clinician.":"Imilayezo ihlala kuleli khasi; ayithunyelwa kudokotela.","Not live AI or therapy. Review the demo disclosure before chatting.":"Akusiyo AI ephilayo kumbe ukwelatshwa. Bala incazelo ungakakhulumi.",
 "SUPPORT BEYOND THE CONVERSATION":"USIZO NGAPHANDLE KWENGXOXO","There is no ":"Akula ","single right way":"ndlela eyodwa"," to begin.":" yokuqala.","Take a quiet moment, explore trusted information, or move directly toward human support. You're always in control.":"Phumula kancane, bala ulwazi oluthembekileyo, kumbe uye ngqo kubantu abangakusekela. Ukukhetha ngokwakho.",
 "Take a pause":"Phumula kancane","Explore awareness":"Funda okunengi","Reach real support":"Thola usizo",
 "Finish":"Qedisa","Next step":"Isinyathelo esilandelayo","Done":"Kuphelile","Not now":"Hatshi khathesi","I understand · Continue":"Ngiyazwisisa · Qhubeka",
 "BEFORE YOU BEGIN":"UNGAKAQALISI","Your comfort comes first.":"Ukukhululeka kwakho kuqala.","For adults 18+ only. You can skip this and visit Connect instead.":"Kubantu abaleminyaka engu-18 kusiya phezulu kuphela. Ungakwedlula lokhu uye kuXhumana.",
 "IMMEDIATE SUPPORT":"USIZO OLUPHUTHUMAYO","Please seek real help now.":"Sicela udinge usizo lwabantu khathesi.","Close guidance":"Vala incazelo",
 "Explore":"Hlola","Important":"Okuqakathekileyo","Urgent help":"Usizo oluphuthumayo","Independent support":"Usizo oluzimeleyo","Not therapy or a crisis service":"Ayisiyo indawo yokwelapha kumbe usizo oluphuthumayo",
 "THE LIBRARY":"ILAYIBHRARI","Take what you need today.":"Khetha okufunayo lamuhla.","Search the library…":"Dinga elayibhrari…","Read more":"Bala okunengi","Save":"Gcina","Saved":"Kugciniwe","Read the story":"Bala indaba","Find real support":"Dinga usizo lwabantu",
 "Real people. ":"Abantu bangempela. ","Real support.":"Usizo lwangempela.","Your choice.":"Ukukhetha kwakho.","Explore your options and prepare to make that first contact. You never have to share a chat transcript to look for help.":"Hlola izindlela zakho, ulungiselele ukukhuluma lomuntu. Akudingeki ukuthi wabelane ngengxoxo yakho ukuze udinge usizo.",
 "How would you like to connect?":"Ungathanda ukuxhumana njani?","What about affordability?":"Mayelana lentengo ungakhetha kuphi?","Which language works for you?":"Ufuna luphi ulimi?","Preferred language":"Ulimi olufunayo",
 "View options":"Bona izindlela","Copy my preferences (not chat text)":"Kopisha engikukhethileyo (hatshi ingxoxo)"
};
export function tr(lang:Language, english:string):string {
 const dictionary:Record<string,string>=lang==="sn"?shona:lang==="nd"?ndebele:{};
 return dictionary[english] ?? english;
}
