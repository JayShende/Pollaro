"use client";
import { Button } from "@/components/ui/button";
import { signOut } from "next-auth/react";
import axios from "axios";
const Dash = () => {
  async function callApi() {
    const response = await axios({
      method: "get",
      url: "http://localhost:3000/api/proxy/v1/app/loggerAPI",
    });
    console.log(response.data);
  }
  return (
    <div>
      Hello Ji
      <Button
        variant="destructive"
        onClick={() => {
          signOut();
        }}
      >
        SignOut
      </Button>
      <div>
        <Button onClick={callApi}>Call Logger APi</Button>
      </div>
    </div>
  );
};

export default Dash;
