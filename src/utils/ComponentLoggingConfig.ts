export class ComponentLoggingConfig {
    public static Lightblue = '🐦;background: lightblue; color: #444;';
    public static Lightgreen = '🍀;background: lightgreen; color: #444;';
    public static Lightsalmon = '🦊;background: lightsalmon; color: #444;';
    public static Lightcyan = '🐋;background: lightcyan; color: #444;';
    public static Lightpink = '🧠;background: lightpink; color: #444;';
    public static Lightskyblue = '💧;background: lightskyblue; color: #444;';
    public static Lightsteelblue = '🌊;background: lightsteelblue; color: #444;';
    public static Lightkhaki = '🍯;background: khaki; color: #444;';

    public static DarkSeagreen = '🐊;background: lightseagreen; color: white;';
    public static DarkPurple = '😈;background: purple; color: white;';
    public static DarkBlue = '🌎;background: blue; color: white;';
    public static DarkGreen = '🐸;background: green; color: white;';
    public static DarkBlueviolet = '🤷‍♀️;background: blueviolet; color: white;';
    public static DarkChocolate = '🍩;background: chocolate; color: white;';
    public static DarkRed = '👹;background: red; color: white;';
    public static DarkCrimson = '🍷;background: crimson; color: white;';
    public static DarkCornflowerblue = '🦋;background: cornflowerblue; color: white;';
    public static DarkCadetblue = '👗;background: cadetblue; color: white;';
    public static DarkBrown = '🌰;background: brown; color: white;';
    public static DarkMediumvioletred = '👩🏽‍🎤;background: mediumvioletred; color: white;';
    public static DarkGrey = '🌚;background: #444; color: white;';
    public static DarkSalmon = '🦐;background: salmon; color: white;';

    static printPerformanceMessage(message: string, t1: number, t2: number, color: string): void {
        const minutes: number = Math.round((((t2 - t1) / 1000) / 60));
        const seconds: string = (((t2 - t1) / 1000) % 60).toFixed(2);
        let minText: string = "";
        if (minutes > 0) {
            minText = ' ' + minutes.toFixed(0);

            if (minutes > 1) {
                minText = minText + ' minutes and ';
            } else {
                minText = minText + ' minute and ';
            }
        }
        console.log(`${message} in ${minText}${seconds} seconds!`, color);
    }
}
