export const EmailSubscriptionForm = () => {
  return (
    <div>
      <form>
        <div className="flex w-full">
          <input
            type="text"
            className="w-full px-4 py-3 border focus:outline-none focus:ring-2 focus:ring-primary rounded-l-md"
          />
          <button
            type="submit"
            className="px-4 py-3 bg-primary border-primary text-white rounded-r-md"
          >
            Subscribe
          </button>
        </div>
      </form>
    </div>
  );
};
