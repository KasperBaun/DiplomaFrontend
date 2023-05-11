// Icons: https://icons.getbootstrap.com/#usage

export abstract class Constants {
    public static readonly loggingEnabled = true;

    /* Styling */
    public static readonly royalCopenhagenBlueColor = "#000080";
    public static readonly groenlundGreenColor = "#09473f";// "rgb(9, 71, 63)"
    public static readonly groenlundGoldColor = "#FFD700";
    public static readonly primaryColor = this.groenlundGreenColor; // Royal Copenhagen Blue
    public static readonly secondaryColor = "#FFD700"; // Groenlund gold color
    public static readonly primaryTextColor ="#FFFFFF"
    public static readonly backgroundColor: "#FFFFFF";

    /* Company information */
    public static readonly companyName = "Grønlund";
    public static readonly companyUrl = "https://www.gl-antik.dk/";
    public static readonly companyAdress = "Gl. Kongevej 94a, st tv, 1850 Frederiksberg";
    public static readonly companyStreet = "Gl. Kongevej 94a, st tv";
    public static readonly companyZipcode = "1850";
    public static readonly companyCity = "Frederiksberg";
    public static readonly companyTelephoneNumber = "+45 42433454";
    public static readonly companyEmail = "gl-antik@mail.com";
    public static readonly instagramUrl = "https://www.instagram.com/gl_antik.dk/";
    public static readonly facebookUrl = "https://www.facebook.com/profile.php?id=100090134074673";
    public static readonly mapsLink = "https://www.google.com/maps/place/Gr%C3%B8nlund+Antik/@55.6751497,12.546572,18z/data=!4m6!3m5!1s0x46525337b2633621:0xf95651f5b021e505!8m2!3d55.6753388!4d12.5466096!16s%2Fg%2F11twc63cwj";

    /* Application configuration */
    public static readonly apiBaseUrl = "https://groenlund.uglyrage.com/api";
    public static readonly devApiBaseUrl = "https://api.uglyrage.com/api";
    public static readonly localApiUrl = "https://localhost:7003/api";
}