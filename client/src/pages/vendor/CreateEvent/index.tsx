import { useCreateEvent } from "../hooks/useCreateEvent";

const CreateEvent = () => {
  const {
    handleSubmit,
    eventName,
    description,
    dateTime,
    location,
    totalTickets,
    isVendor,
  } = useCreateEvent();

  return !isVendor ? (
    <div className="w-full flex justify-center mt-10 text-3xl font-bold text-red-500 bg-red-100 py-10">
      Unauthorized
    </div>
  ) : (
    <div className="p-12 flex flex-col w-full items-center gap-8">
      <h1 className="font-semibold text-3xl mb-8">Create a new event</h1>
      <form onSubmit={handleSubmit} className="flex-col flex w-1/3 gap-8">
        <div className="flex flex-col gap-2">
          <p className="font-semibold text-lg">Name</p>
          <input
            className="text-black transition-all outline-none  border-opacity-0 font-medium bg-primary hover:bg-opacity-20 focus:bg-opacity-20 placeholder:text-stone-900 bg-opacity-15 w-full p-4 rounded-lg text-xl"
            type="text"
            value={eventName.value}
            placeholder="Enter event name"
            onChange={eventName.onChange}
          />
        </div>
        <div className="flex flex-col gap-2">
          <p className="font-semibold text-lg">Description</p>
          <textarea
            value={description.value}
            onChange={description.onChange}
            placeholder="Describe your event"
            className="p-4 bg-primary bg-opacity-15 hover:bg-opacity-20 focus:bg-opacity-20 placeholder:text-stone-900 font-medium text-xl rounded-lg outline-none"
          />
        </div>
        <div className="flex flex-col w-full gap-2">
          <p className="font-semibold text-lg">Date</p>
          <div className="flex w-full">
            <input
              value={dateTime.day}
              placeholder="dd"
              type="number"
              className="bg-secondary font-semibold bg-opacity-15 hover:bg-opacity-20 focus:bg-opacity-20 placeholder:text-stone-900 p-4 text-xl w-24 flex border-r-2 border-sky-500 rounded-l-lg outline-none"
              onChange={dateTime.onChange}
              name="day"
            />
            <input
              value={dateTime.month}
              placeholder="mm"
              type="number"
              className="bg-secondary font-semibold bg-opacity-15 hover:bg-opacity-20 focus:bg-opacity-20 placeholder:text-stone-900 p-4 text-xl flex w-24 border-r-2 border-sky-500 outline-none"
              onChange={dateTime.onChange}
              name="month"
            />
            <input
              value={dateTime.year}
              placeholder="yyyy"
              type="number"
              className="bg-secondary font-semibold bg-opacity-15 hover:bg-opacity-20 focus:bg-opacity-20 placeholder:text-stone-900 p-4 text-xl w-24 flex rounded-r-lg outline-none"
              onChange={dateTime.onChange}
              name="year"
            />
          </div>
        </div>
        <div className="flex flex-col w-full gap-2">
          <p className="font-semibold text-lg">Time</p>
          <div className="flex w-full">
            <input
              value={dateTime.hour}
              placeholder="dd"
              type="number"
              className="bg-secondary font-semibold bg-opacity-15 hover:bg-opacity-20 focus:bg-opacity-20 placeholder:text-stone-900 p-4 text-xl w-24 flex border-r-2 border-sky-500 rounded-l-lg outline-none"
              onChange={dateTime.onChange}
              name="hour"
            />
            <input
              value={dateTime.minute}
              placeholder="mm"
              type="number"
              className="bg-secondary font-semibold bg-opacity-15 hover:bg-opacity-20 focus:bg-opacity-20 placeholder:text-stone-900 p-4 text-xl flex w-24 rounded-r-lg outline-none"
              onChange={dateTime.onChange}
              name="minute"
            />
          </div>
        </div>
        <div className="flex flex-col gap-2">
          <p className="font-semibold text-lg">Location</p>
          <input
            type="text"
            value={location.value}
            onChange={location.onChange}
            placeholder="Set a location"
            className="p-4 bg-primary font-medium bg-opacity-15 hover:bg-opacity-20 focus:bg-opacity-20 placeholder:text-stone-900 text-xl rounded-lg outline-none"
          />
        </div>
        <div className="flex w-full items-center flex-col gap-2">
          <p className="font-semibold text-lg">Total tickets</p>
          <input
            type="number"
            value={totalTickets.value}
            onChange={totalTickets.onChange}
            placeholder="Total tickets"
            className="p-4 bg-primary text-center w-1/2 font-semibold bg-opacity-15 hover:bg-opacity-20 focus:bg-opacity-20 placeholder:text-stone-900 text-xl rounded-lg outline-none"
          />
        </div>

        <input
          type="submit"
          value="Create Event"
          className="bg-primary text-white font-bold p-4 rounded-lg w-full text-xl cursor-pointer hover:bg-primary transition-all"
        />
      </form>
    </div>
  );
};

export default CreateEvent;
