import { helpText } from "../../configs/commands";

const handleInstructions = (status: "help" | "notGiven" | "invalid"): void => {
    switch (status) {
        case "help":
            console.log(helpText);
            break;
        case "notGiven":
            throw new Error("Command not provided. Use --help for more info.");
        case "invalid":
            throw new Error("Invalid options. Use --help for more info.");
        default:
            throw new Error("Unknown status received.");
    }
};

export default handleInstructions;