export const replaceMongoIdInArray = (array) => {
  const mappedArray = array
    .map((item) => {
      return {
        id: item._id.toString(),
        ...item,
      };
    })
    .map(({ _id, ...rest }) => rest);

  return mappedArray;
};

export const replaceMongoIdInObject = (obj) => {
  if (!obj || !obj._id) {
    throw new Error("Invalid object passed to replaceMongoIdInObject");
  }

  const { _id, ...updatedObj } = { ...obj, id: obj._id.toString() };
  return updatedObj;
};

export const isDateInBetween = (date, from, to) => {
  return (
    new Date(date).getTime() >= new Date(from).getTime() &&
    new Date(date).getTime() <= new Date(to).getTime()
  );
};

export const getDayDifference = (checkin, checkout) => {
  const checkinDate = new Date(checkin);
  const checkoutDate = new Date(checkout);
  const timeDifference = checkoutDate.getTime() - checkinDate.getTime();
  return Math.ceil(timeDifference / (1000 * 3600 * 24) +1);
};
