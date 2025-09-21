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
2. The Form how it is Being Created and how the hook is getting the presigned url and uploading the files -> understand and document this 🟥🟥🟥

## 🔹 4. Summary

* ✅ **Server → Client** is allowed.
* ❌ **Client → Server** is NOT allowed.
* ✅ Server components **can be async** (and usually are).
* ❌ Client components **cannot** be async (must fetch via hooks like `useEffect` or react-query).

Great question 🚀

Yes, you **can** call

```ts
const params = useParams();
const formId = params.formId?.toString();
```

inside any component that is  **a client component and rendered somewhere under `app/form/[formId]/edit/page.tsx`** .

---

### ✅ Things to keep in mind:

1. `useParams` only works in **client components** (`"use client"` at the top).
2. You don’t need to fetch `params` in the `page.tsx` and pass them down manually — every nested client component can call `useParams()` itself.
3. The value of `params.formId` will be the same everywhere in that route tree, since it comes from the `[formId]` dynamic segment.

---

### Example:

```tsx
// app/form/[formId]/edit/page.tsx
import Nested from "./nested";

export default function EditFormPage() {
  return (
    <div>
      <h1>Edit Form</h1>
      <Nested />
    </div>
  );
}
```

```tsx
// app/form/[formId]/edit/nested.tsx
"use client";
import { useParams } from "next/navigation";

export default function Nested() {
  const params = useParams();
  const formId = params.formId?.toString();

  return <div>FormId in nested: {formId}</div>;
}
```

👉 This works fine, because `useParams` looks at the **current route** (`/form/[formId]/edit/...`) and extracts the segment values.

### Tanstack Query passing values to the mutation validation query part

put Req expects an body manadatoryly


Revision how the tabs have been used across the layout and page.tsx using the custom created tabs provider.tsx https://chatgpt.com/c/68cff9d8-4e38-8320-8698-031fa88b7a3d ask this chat to explain it in detail
