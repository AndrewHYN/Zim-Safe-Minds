import test from "node:test";
import assert from "node:assert/strict";
import { appointmentMessage,appointmentChoices } from "../src/lib/appointmentPreview.mjs";
test("appointment request is a local text draft, not a claim that an appointment was booked",()=>{
 const m=appointmentMessage({service:"intro",format:"online",timing:"morning"});
 assert.match(m,/online or phone/);
 assert.match(m,/weekday mornings/);
 assert.doesNotMatch(m,/confirmed|reserved|booked|appointment number/i);
});
test("unknown fields and sensitive content cannot appear in appointment text",()=>{
 const m=appointmentMessage({service:"PRIVATE DIAGNOSIS",format:"<script>",timing:"PHONE NUMBER",healthDetails:"sensitive"});
 assert.doesNotMatch(m,/PRIVATE|script|PHONE NUMBER|sensitive/);
 assert.match(m,/appointment/);
});
test("appointment controls provide enough accessible labels",()=>{
 const c=appointmentChoices();
 assert.equal(c.service.length,3);
 assert.equal(c.format.length,3);
 assert.equal(c.timing.length,3);
});
