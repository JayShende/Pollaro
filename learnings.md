# **Learnings From The Project Pollaro**

## Backend Learnings

1. Created an New Handler in the `apps\backend\src\utils\prismaErrorHandler.ts` ie the Prisma Error Handler which Handles the Prisma Errors
2. The **Options** in the Questions we send it as an Array of Objects So That We can easliy Use the Create Synatx in Prisma To Create the options
3. Controllers
   * The Service if throws an API error or any Error Then it Must Be Caught by the Controller and send the response accordingly
   * ie the service Request in the controller must be inside in try catch block ie when the service throws any error or any api error the the controller can send relevant response
   * if the error any (Custom APIError or any Other error ) if not caught then can crash the application
   * The Roles of An Controller is
     * Extrach the Req body, Params, Query parameter
     * Send the Response - Success or Failure Response
     * Handle the Error thrown by the Service inside the `Try()catch{}` Block
   * Idelly There Should Be No Try Catch Block Inside an **Service Function**
   * 
4. Service
   * The Service Dont Have any Try Ctach block it throws only two types of error APi Error - that we throw expliacyly and another is the error that may cause at server side during the prisma operation
5. The **Delete Request** Should Not Have a Body Use ***params*** in an Delete Request

## Frontend Learings

1. Layout how the Layout is made ie the space between haeder and main , where the header has a fixed posostion and an fixed height the main takes the entire remaining height


## 🔹 4. Summary

* ✅ **Server → Client** is allowed.
* ❌ **Client → Server** is NOT allowed.
* ✅ Server components **can be async** (and usually are).
* ❌ Client components **cannot** be async (must fetch via hooks like `useEffect` or react-query).
