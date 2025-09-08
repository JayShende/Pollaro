
import { Button } from "@/components/ui/button";
import { signOut } from "next-auth/react";
import axios from "axios";
import { auth } from "@/auth";

// const Dash = () => {
//   async function callApi() {
//     const response = await axios({
//       method: "get",
//       url: "http://localhost:3000/api/proxy/v1/app/loggerAPI",
//     });
//     console.log(response.data);
//   }

//   return (
//     <div>
//       <SessionCompoenent/>
//       Hello Ji
//       <Button
//         variant="destructive"
//         onClick={() => {
//           signOut();
//         }}
//       >
//         SignOut
//       </Button>
//       <div>
//         <Button onClick={callApi}>Call Logger APi</Button>
//       </div>
//     </div>
//   );
// };

// export default Dash;


const SessionCompoenent = async () => {
  const session = await auth();
  if (!session?.user?.id) {
    return <div> Session Error</div>;
  }
  console.log(session);
  return (
    <div>
      Hello it WWorks
      {JSON.stringify(session)}
    </div>
  );
};

export default SessionCompoenent;