import { useActionData, useFetcher } from "react-router-dom";
import Button from "../../ui/Button";
import { updateOrder } from "../../services/apiRestaurant";
import { isValidPhone } from "../../utils/helpers";

function UpdateOrder({ order }) {
  const fetcher = useFetcher();
  //This comments and  these steps are in order to use the returned errors from action function but with fetcher
  // useActionData works only with Form and useSubmit, errors with fetcher are stored in fetcher.data (like the result of fetcher.load(<route>))
  const updateFormErrors = fetcher.data?.errors;

  const handleSubmit = (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);
    // In order to action function works with fetcher 'and get errors from it' , we must use fetcher.submit
    fetcher.submit(formData, { method: "patch" });
  };

  return (
    <fetcher.Form
      method="PATCH"
      className="flex flex-col items-center gap-2 divide-y divide-stone-50 border-b border-t bg-stone-200 py-4 text-right"
      onSubmit={handleSubmit}
    >
      <div className="flex items-center gap-5 pb-4">
        <label className="sm:basis-50">Update phone number</label>
        <div>
          <input type="tel" name="phone" className="input w-full" />
          {updateFormErrors?.phone && (
            <p className="mt-2 rounded-md bg-red-100 p-1.5 text-center text-xs text-red-600">
              {updateFormErrors.phone}
            </p>
          )}
        </div>
      </div>

      <div className="flex items-center gap-5 py-4">
        <input
          type="checkbox"
          name="priority"
          id="priority"
          className="h-6 w-6 accent-yellow-400 focus:outline-none focus:ring focus:ring-yellow-300 focus:ring-offset-2"
        />
        <label htmlFor="priority" className="font-medium">
          Give my order a priority
        </label>
      </div>
      <div className="flex flex-col items-center pt-2">
        <Button onClick={() => fetcher.submit()} type="small">
          Update
        </Button>
        {updateFormErrors?.update && (
          <p className="mt-2 rounded-md bg-red-100 p-1.5 text-center text-xs text-red-600">
            {updateFormErrors.update}
          </p>
        )}
      </div>
    </fetcher.Form>
  );
}

export default UpdateOrder;

export async function action({ request, params }) {
  // To use param , I had to use fetcher.submit up there and do all of this T-T
  const formData = await request.formData();
  const data = Object.fromEntries(formData);
  const updatedOrder = {
    ...data,
    priority: data.priority === "on",
  };

  const errors = {};
  if (data.phone && !isValidPhone(data.phone)) {
    errors.phone = "Invalid phone number";
  }
  if (Object.keys(errors).length > 0) {
    //Must be returned in {} for somereason
    return { errors };
  }

  try {
    await updateOrder(params.orderId, updatedOrder);
  } catch (error) {
    errors.update = "Something went wrong, please try again!";
    return { errors };
  }

  return null;
}
