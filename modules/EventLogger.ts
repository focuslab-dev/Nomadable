declare var runGtag: any;

export const logEventCheckIn = (placeId: string) => {
  try {
    runGtag("event", "checkin", {
      event_label: placeId,
    });
  } catch (err) {}
};

export const logEventSignup = () => {
  try {
    runGtag("event", "signup_succeed");
  } catch (err) {}
};

export const logEventGoogleLink = (googlePlaceId: string) => {
  try {
    runGtag("event", "click_google_map_link", {
      event_label: googlePlaceId,
    });
  } catch (err) {}
};

export const logEventSubmitPlace = () => {
  try {
    runGtag("event", "submit_place");
  } catch (err) {}
};
