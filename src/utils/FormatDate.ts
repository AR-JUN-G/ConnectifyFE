import { format } from "date-and-time";

const formatChatTime = (dateInput: Date | string) => {
    if (!dateInput) return "";
    const date = new Date(dateInput);
    const now = new Date();

    // If today, show time
    if (date.toDateString() === now.toDateString()) {
        return format(date, 'h:mm A');
    }

    // If yesterday
    const yesterday = new Date();
    yesterday.setDate(now.getDate() - 1);
    if (date.toDateString() === yesterday.toDateString()) {
        return "Yesterday";
    }

    // Otherwise show date
    return format(date, 'MMM D');
};


export default formatChatTime;