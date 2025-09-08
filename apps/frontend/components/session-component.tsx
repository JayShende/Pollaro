import { auth } from "@/auth";
import axios from "axios";
import { Button } from "./ui/button";
import { signOut } from "next-auth/react";

// const SessionCompoenent = async () => {
//   const session = await auth();
//   if (!session?.user?.id) {
//     return <div> Session Error</div>;
//   }
//   console.log(session);
//   return (
//     <div>
//       Hello it WWorks
//       {JSON.stringify(session)}
//     </div>
//   );
// };

// export default SessionCompoenent;

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