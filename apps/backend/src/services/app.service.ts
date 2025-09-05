
import { name } from "@repo/db/client";

const logger =()=>{
    console.log("loggerFunction called"); // Add this line
    const answer=`Hello Ji This is Testing The Final flow and If You are Reading This message That means It's Working Successfully ! Name-> ${name}`;
    return answer;
}

export default{
    logger
}