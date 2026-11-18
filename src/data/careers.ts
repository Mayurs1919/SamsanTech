export interface Job {
    id: string;
    title: string;
    slug: string;
    country: string;
    city: string;
    experience: "0-2 Years" | "2-5 Years" | "5-8 Years" | "8+ Years";
    category: "Embedded Engineering" | "HMI Development" | "Connectivity" | "Validation & Testing" | "Systems Engineering";
    type: string;
    description: string;
    skills: string[];
}

export const CAREER_JOBS: Job[] = [
    {
        id: "1",
        title: "Android HAL Engineer",
        slug: "android-hal-engineer",
        country: "India",
        city: "Pune, Bangalore",
        experience: "2-5 Years",
        category: "Embedded Engineering",
        type: "Full-time",
        description: "Need engineers with strong experience in Android HAL layer development, HIDL/AIDL interfaces, and low-level system integration across automotive architectures.",
        skills: ["AOSP", "AAOS", "HIDL", "AIDL", "Soong/Make", "Android Architecture"]
    },
    {
        id: "2",
        title: "Android HMI Engineer",
        slug: "android-hmi-engineer",
        country: "India",
        city: "Pune",
        experience: "5-8 Years",
        category: "HMI Development",
        type: "Full-time",
        description: "Hiring experienced HMI Engineers for Android-based automotive cockpit applications with system and user-level app development experience.",
        skills: ["Java", "Kotlin", "Jetpack", "HMI Development", "Android Automotive"]
    },
    {
        id: "3",
        title: "Android HMI Engineer — Unreal",
        slug: "android-hmi-engineer-unreal",
        country: "India",
        city: "Pune",
        experience: "5-8 Years",
        category: "HMI Development",
        type: "Full-time",
        description: "Hiring developers for advanced cockpit HMI development using Unreal Engine with experience in high-performance 3D UI rendering.",
        skills: ["Java", "Kotlin", "Unreal Engine", "HMI Development", "High-Performance UI"]
    },
    {
        id: "4",
        title: "Associate Embedded Test Engineer",
        slug: "associate-embedded-test-engineer",
        country: "India",
        city: "Pune",
        experience: "0-2 Years",
        category: "Validation & Testing",
        type: "Full-time",
        description: "Entry-level position for passionate engineers looking to build a career in automotive embedded testing, test script execution, and validation.",
        skills: ["Embedded C", "Python", "Manual Testing", "CAN Protocol", "Test Automation"]
    },
    {
        id: "5",
        title: "Automotive IVI Testing Engineer",
        slug: "automotive-ivi-testing-engineer",
        country: "India",
        city: "Pune",
        experience: "2-5 Years",
        category: "Validation & Testing",
        type: "Full-time",
        description: "Looking for IVI Test Engineers for in-vehicle infotainment system validation, CAPL scripting, and test automation in automotive environments.",
        skills: ["Embedded C", "CAPL Scripting", "Python", "Robot Framework", "IVI Testing", "Test Automation"]
    },
    {
        id: "6",
        title: "Connectivity Engineer",
        slug: "connectivity-engineer",
        country: "India",
        city: "Bangalore",
        experience: "8+ Years",
        category: "Connectivity",
        type: "Full-time",
        description: "Looking for senior engineers in the automotive connectivity domain with hands-on experience in telematics, Bluetooth/Wi-Fi stack, and Yocto Linux.",
        skills: ["Bluetooth", "Wi-Fi", "AOSP", "Telematics", "Yocto Linux", "Connectivity Stack"]
    },
    {
        id: "7",
        title: "HMI Tester",
        slug: "hmi-tester",
        country: "India",
        city: "Bangalore",
        experience: "2-5 Years",
        category: "Validation & Testing",
        type: "Full-time",
        description: "Seeking HMI Testers with strong experience in validating automotive HMI applications, UI automated testing, and Appium scripting.",
        skills: ["Linux", "Python", "Appium", "Automation Scripting", "Android Testing", "Embedded Testing"]
    },
    {
        id: "8",
        title: "Junior Android HMI Developer",
        slug: "junior-android-hmi-developer",
        country: "India",
        city: "Bangalore",
        experience: "0-2 Years",
        category: "HMI Development",
        type: "Full-time",
        description: "Entry-level role for Android developers eager to learn automotive cockpit interfaces, Kotlin UI development, and HMI framework architecture.",
        skills: ["Java", "Kotlin", "Android SDK", "Git", "UI Components"]
    },
    {
        id: "9",
        title: "Linux BSP Developer",
        slug: "linux-bsp-developer",
        country: "India",
        city: "Pune",
        experience: "2-5 Years",
        category: "Embedded Engineering",
        type: "Full-time",
        description: "Hiring developers for Linux BSP and driver development across automotive embedded platforms (Qualcomm, NXP, TI, Infineon).",
        skills: ["Embedded C", "Linux BSP", "Driver Development", "Qualcomm", "NXP", "TI", "Infineon"]
    },
    {
        id: "10",
        title: "Media Projection Engineer",
        slug: "media-projection-engineer",
        country: "India",
        city: "Pune, Bangalore",
        experience: "2-5 Years",
        category: "HMI Development",
        type: "Full-time",
        description: "Seeking engineers with experience in smartphone projection systems (Android Auto, Apple CarPlay) and media projection integration for automotive platforms.",
        skills: ["Android Auto", "Apple CarPlay", "Media Projection", "System Integration"]
    },
    {
        id: "11",
        title: "Multimedia & Middleware Engineer",
        slug: "multimedia-middleware-engineer",
        country: "India",
        city: "Pune, Bangalore",
        experience: "2-5 Years",
        category: "Embedded Engineering",
        type: "Full-time",
        description: "Seeking candidates for multimedia and middleware development in automotive systems including audio/video frameworks and system-level programming.",
        skills: ["Android Media Framework", "Software Development", "Audio/Video Frameworks", "System Programming"]
    },
    {
        id: "12",
        title: "Multimedia & Middleware Engineer — OTA",
        slug: "multimedia-middleware-engineer-ota",
        country: "India",
        city: "Bangalore",
        experience: "5-8 Years",
        category: "Embedded Engineering",
        type: "Full-time",
        description: "Looking for professionals with experience in software update systems, OTA mechanisms, AOSP/AAOS, and system integration for automotive platforms.",
        skills: ["OTA Updates", "AOSP", "AAOS", "Java", "Kotlin", "System Integration"]
    },
    {
        id: "13",
        title: "SPOC — RD ECU",
        slug: "spoc-rd-ecu",
        country: "India",
        city: "Pune",
        experience: "5-8 Years",
        category: "Embedded Engineering",
        type: "Full-time",
        description: "Hiring Single Point of Contact (SPOC) for RD ECU development and coordination with experience in ECU software development and automotive communication protocols.",
        skills: ["Linux", "C++", "Connectivity Protocols", "ECU Development", "Automotive Communication"]
    },
    {
        id: "14",
        title: "SPOC — V2X",
        slug: "spoc-v2x",
        country: "India",
        city: "Pune",
        experience: "5-8 Years",
        category: "Connectivity",
        type: "Full-time",
        description: "Looking for a SPOC with expertise in Vehicle-to-Everything (V2X) communication systems handling end-to-end V2X modules and integrations.",
        skills: ["Linux", "C++", "Middleware", "V2X Communication", "System Integration"]
    },
    {
        id: "15",
        title: "Systems Engineer",
        slug: "systems-engineer",
        country: "India",
        city: "Pune",
        experience: "8+ Years",
        category: "Systems Engineering",
        type: "Full-time",
        description: "Looking for senior Systems Engineers with strong background in requirements engineering, system architecture, and integration across automotive E/E domains.",
        skills: ["Requirements Engineering", "System Architecture", "CAN", "LIN", "Ethernet", "ISO 26262", "ISO 21434", "DOORS", "Polarion", "JIRA", "MBSE", "SysML", "UDS", "DoIP"]
    }
];
