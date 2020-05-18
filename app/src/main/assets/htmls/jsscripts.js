/*

Noor Aljum3a App: Alkahf Sora Reading _ تطبيق نور الجمعة: لتلاوة سورة الكهف
Idea, Design and Devlopment are made by Samer F. Lulu - 2020 Ramadan 1441
his App is OPEN SOURCE and free to copy, modify and reuse but NOT TO BE USED IN ANY COMMERCIAL MEANS
for suggestions and commments please email at: s@SamerLulu.com  / Samer.Lulu@gmail.com

*/

// Main Global Vars
var toggleScrolling = true;
var pressTimer;
var moveDirection = 0;
var firstMovePosX = 0;
var secondMovePosX = 0;
var delta = 0;

//Document Loader
$(document).ready(function () {
    $("#Ayat").scrollTop(0);

    var currentScreenMode = ScreenMode.NORMAL;

    // Load Settiing
    AppSettings.SetAppScreenMode(ScreenModes.GetScreenMode());
    AppSettings.SetAppScrollSpeed(ScrollSpeeds.GetScrollSpeed());
    AppSettings.SetAppAyaFontSize(AyaFontSizes.GetAyaFontSize());

    // Events Attaching
    $("#Ayat").on("touchstart mousedown", ayatTouchStart);
    $("#Ayat").on("touchend mouseup", ayatTouchEnd);
    $("#Ayat").on("touchmove", ayatTouchMove);

    $("#Ayat").on("dblclick", showSettings);

    $("#SoraTitle").on("touchstart click", showSettings);

    $("#btnCloseSettings").on("touchstart click", btnCloseSettings);

    $("#btnDoneColorMode").on("touchstart click", btnDoneColorMode);
    $("#btnDoneScrollingSpeed").on("touchstart click", btnDoneScrollingSpeed);
    $("#btnDoneAyaFontSize").on("touchstart click", btnDoneAyaFontSize);
    $("#btnDoneAboutUs").on("touchstart click", btnDoneAboutUs);
    $("#btnDoneContactUs").on("touchstart click", btnDoneContactUs);

    $("#btnShowColorModeSettings").on("touchstart click", btnShowColorModeSettings);
    $("#ScreenModeNormal").on("touchstart click", { vScreenMode: ScreenModes.NORMAL }, btnSaveColorMode);
    $("#ScreenModeDark").on("touchstart click", { vScreenMode: ScreenModes.DARK }, btnSaveColorMode);
    $("#ScreenModeLight").on("touchstart click", { vScreenMode: ScreenModes.LIGHT }, btnSaveColorMode);

    $("#btnShowScrollingSettings").on("touchstart click", btnShowScrollingSettings);
    $("#btnSlowerScroll").on("touchstart click", btnSlowerScroll);
    $("#btnFasterScroll").on("touchstart click", btnFasterScroll);

    $("#btnShowAyaFontSizeSettings").on("touchstart click", btnShowAyaFontSizeSettings);
    $("#btnSmallerAyaTextSize").on("touchstart click", btnSmallerAyaTextSize);
    $("#btnBiggerAyaTextSize").on("touchstart click", btnBiggerAyaTextSize);

    $("#btnShowAboutApp").on("touchstart click", btnShowAboutApp);

    $("#btnShowContactUs").on("touchstart click", btnShowContactUs);

    $("#btnShowDemo").on("touchstart click", btnShowDemo);
    $("#btnCloseDemo").on("touchstart click", btnCloseDemo);
    $("#btnShowDemoYes").on("touchstart click", btnShowDemoYes);
    $("#btnShowDemoNo").on("touchstart click", btnShowDemoNo);

    // To Show/Hide Demo at Stratup
    const vChoice = ShowDemoAgainChoice.GetShowDemoAgainChoice();
    showDemo(vChoice);
    
}); // ##### end of Document Ready


// events handlers
function ayatTouchMove() {
    event.preventDefault();
    event.stopPropagation();

    // get touch position
    //var x = Math.round( event.touches[0].clientX );
    var y = Math.round( event.touches[0].clientY );
    //var x2 = Math.round( event.touches[0].clientX );
    var y2 = Math.round( event.touches[0].clientY );

    const scrollTop = $(document).scrollTop();

    clearTimeout(pressTimer);
    toggleScrolling = false;
 
    //detect move direction
    if (firstMovePosX == 0){
        firstMovePosX = y;
    } 
    
    secondMovePosX = y2;
    moveDirection = Math.sign(firstMovePosX - secondMovePosX);
    delta = delta + 1;
    const documentHeight = $(document).height();
    const documentWidth = $(document).width();

    var deltaH = document.body.clientHeight;
    var deltaW = document.body.clientWidth;

    const deltaX = deltaH / deltaW /10;

    
    $('html, body').animate({ scrollTop: scrollTop + moveDirection * deltaX},
                {
                    duration: 0,
                    easing: "linear"
                }
            );

    return false;
}

function ayatTouchStart() {
    event.preventDefault();
    event.stopPropagation();

    if(event.type == 'touchstart'){
        $(this).off('mousedown');
    }

    pressTimer = setTimeout(function () { toggleScrolling = false; showSettings(); }, 1000);

    return false;
}

function ayatTouchEnd() {
    event.preventDefault();
    event.stopPropagation();

    if(event.type == 'touchend'){
        $(this).off('mouseup');
    }

    clearTimeout(pressTimer);
    msg(toggleScrolling);
    if(moveDirection == 0) {
        if (toggleScrolling) {
            startScroll();
        } else {
            stopScroll();
        }
    }
    
    //to start/stop scrolling
    toggleScrolling = !toggleScrolling;
    
    // reset counters/flags
    moveDirection = 0;
    firstMovePosX = 0;
    secondMovePosX = 0;
    delta = 0;

    return false;
}

function showSettings() {
    $('#Ayat').on('touchmove', function(e){e.preventDefault()});
    $('body').addClass('stopScrolling');
    $("#Settings").fadeIn();
}

function btnCloseSettings() {
    
    if(event.type == 'touchstart'){
        $(this).off('click');
    }

    $("#Ayat").on("touchmove", ayatTouchMove);
    $('body').removeClass('stopScrolling');

    $("#Settings").fadeOut();
}

function btnShowColorModeSettings() {

    if(event.type == 'touchstart'){
        $(this).off('click');
    }

    $("#divScreenModesSettingsView").fadeIn();
    setSelectedScreenMode(ScreenModes.GetScreenMode())
}

function btnShowScrollingSettings() {

    if(event.type == 'touchstart'){
        $(this).off('click');
    }

    $("#divScrollingSpeedSettingsView").fadeIn();
    $("#scrollCounter").text(ScrollSpeeds.GetScrollSpeed());
    $("#textSampleScrolling").scrollTop(0);

    const vAyaFontSize = AyaFontSizes.GetAyaFontSize();
    const fontSizeInPexils = AyaFontSizes.GetAyaFontPXSize(vAyaFontSize) + "px";
    $("#textSampleScrolling").css('font-size', fontSizeInPexils);

    doScrollingSample();
}

function btnShowAyaFontSizeSettings() {

    if(event.type == 'touchstart'){
        $(this).off('click');
    }

    $("#divAyaFontSizeSettingsView").fadeIn();

    const vAyaFontSize = AyaFontSizes.GetAyaFontSize();
    const fontSizeInPexils = AyaFontSizes.GetAyaFontPXSize(vAyaFontSize) + "px";
    $("#textSampleFontSize").css('font-size', fontSizeInPexils);
    $("#sizeCounter").text(vAyaFontSize);
}

function btnShowAboutApp() {

    if(event.type == 'touchstart'){
        $(this).off('click');
    }

    $("#divAboutApp").fadeIn();
}

function btnShowContactUs() {

    if(event.type == 'touchstart'){
        $(this).off('click');
    }

    $("#divContactUs").fadeIn();
}

function btnSaveColorMode(e) {

    if(event.type == 'touchstart'){
        $(this).off('click');
    }

    var vScreenMode = e.data.vScreenMode;
    AppSettings.SetAppScreenMode(vScreenMode);
    ScreenModes.SetScreenMode(vScreenMode);
    setSelectedScreenMode(vScreenMode);
}

function btnDoneColorMode() {

    if(event.type == 'touchstart'){
        $(this).off('click');
    }

    $("#divScreenModesSettingsView").fadeOut();
}

function btnDoneScrollingSpeed() {

    if(event.type == 'touchstart'){
        $(this).off('click');
    }

    $('#textSampleScrolling').stop();
    $("#textSampleScrolling").scrollTop(0);
    $("#divScrollingSpeedSettingsView").fadeOut();
}

function btnDoneAyaFontSize() {

    if(event.type == 'touchstart'){
        $(this).off('click');
    }

    $("#divAyaFontSizeSettingsView").fadeOut();
}

function btnDoneAboutUs() {

    if(event.type == 'touchstart'){
        $(this).off('click');
    }

    $("#divAboutApp").fadeOut();
}

function btnDoneContactUs() {

    if(event.type == 'touchstart'){
        $(this).off('click');
    }

    $("#divContactUs").fadeOut();
}

function btnSlowerScroll() {

    if(event.type == 'touchstart'){
        $(this).off('click');
    }

    var vScrollSpeed = ScrollSpeeds.GetScrollSpeed();
    if (vScrollSpeed > 0) {
        vScrollSpeed = vScrollSpeed - 1;
    }

    $("#btnFasterScroll").css("opacity", "100");
    if (vScrollSpeed == 0) {
        $('#textSampleScrolling').stop();
        $("#btnSlowerScroll").css("opacity", "0");
    } else {
        $("#btnSlowerScroll").css("opacity", "100");
    }
    $("#scrollCounter").text(vScrollSpeed);
    ScrollSpeeds.SetScrollSpeed(vScrollSpeed);
    $('#textSampleScrolling').stop();
    doScrollingSample();
}

function btnFasterScroll() {

    if(event.type == 'touchstart'){
        $(this).off('click');
    }

    var vScrollSpeed = ScrollSpeeds.GetScrollSpeed();
    if (vScrollSpeed < 10) {
        vScrollSpeed = vScrollSpeed + 1;
    }

    $("#btnSlowerScroll").css("opacity", "100");
    if (vScrollSpeed == 10) {
        $("#btnFasterScroll").css("opacity", "0");
    } else {
        $("#btnFasterScroll").css("opacity", "100");
    }
    $("#scrollCounter").text(vScrollSpeed);
    ScrollSpeeds.SetScrollSpeed(vScrollSpeed);

    $('#textSampleScrolling').stop();
    doScrollingSample();

}

function btnSmallerAyaTextSize() {

    if(event.type == 'touchstart'){
        $(this).off('click');
    }

    var vAyaFontSize = AyaFontSizes.GetAyaFontSize();
    if (vAyaFontSize > 1) {
        vAyaFontSize = vAyaFontSize - 1;
    }

    $("#btnBiggerAyaTextSize").css("opacity", "100");
    if (vAyaFontSize == 1) {
        $("#btnSmallerAyaTextSize").css("opacity", "0");
    } else {
        $("#btnSmallerAyaTextSize").css("opacity", "100");
    }
    $("#sizeCounter").text(vAyaFontSize);
    AyaFontSizes.SetAyaFontSize(vAyaFontSize);
    AppSettings.SetAppAyaFontSize(vAyaFontSize);

    const fontSizeInPexils = AyaFontSizes.GetAyaFontPXSize(vAyaFontSize) + "px";
    $("#textSampleFontSize").css('font-size', fontSizeInPexils);

}

function btnBiggerAyaTextSize() {

    if(event.type == 'touchstart'){
        $(this).off('click');
    }

    var vAyaFontSize = AyaFontSizes.GetAyaFontSize();
    if (vAyaFontSize < 10) {
        vAyaFontSize = vAyaFontSize + 1;
    }

    $("#btnSmallerAyaTextSize").css("opacity", "100");
    if (vAyaFontSize == 10) {
        $("#btnBiggerAyaTextSize").css("opacity", "0");
    } else {
        $("#btnBiggerAyaTextSize").css("opacity", "100");
    }
    $("#sizeCounter").text(vAyaFontSize);
    AyaFontSizes.SetAyaFontSize(vAyaFontSize);
    AppSettings.SetAppAyaFontSize(vAyaFontSize);

    const fontSizeInPexils = AyaFontSizes.GetAyaFontPXSize(vAyaFontSize) + "px";
    $("#textSampleFontSize").css('font-size', fontSizeInPexils);
}

function btnShowDemo() {

    if(event.type == 'touchstart'){
        $(this).off('click');
    }

    $("#divDemo").fadeIn();
}

function btnCloseDemo() {

    if(event.type == 'touchstart'){
        $(this).off('click');
    }

    const vChoice = ShowDemoAgainChoice.GetShowDemoAgainChoice();
    if (vChoice == ShowDemoAgainChoice.YES) {
        $("#divDemoAskShowAgian").fadeIn();
    } else {
        $("#divDemo").fadeOut();
    }
}

function btnShowDemoYes() {

    if(event.type == 'touchstart'){
        $(this).off('click');
    }

    AppSettings.SetAppShowDemo(ShowDemoAgainChoice.YES);
    $("#divSora").fadeIn();
    $("#divDemo").fadeOut();
    $("#divDemoAskShowAgian").css("display", "none");
}

function btnShowDemoNo() {

    if(event.type == 'touchstart'){
        $(this).off('click');
    }

    AppSettings.SetAppShowDemo(ShowDemoAgainChoice.NO);
    $("#divSora").fadeIn();
    $("#divDemo").fadeOut();
    $("#divDemoAskShowAgian").css("display", "none");
}

function showDemo(vChoice){
    if (vChoice == ShowDemoAgainChoice.NO){
        $("#divDemo").css("display", "none");
        $("#divSora").css("display", "block");
    } 
}

// ###### Main Functions

// Start / Stop Scrolling
function startScroll() {
    const documentHeight = $(document).height();
    const xScrollSpeed = ScrollSpeeds.GetScrollSpeed();

    if (xScrollSpeed == 0) {
        $('html, body').stop();
    } else {
        const fastRatio = xScrollSpeed != 0 ? 1 / xScrollSpeed : 0;
        const scrollTop = $(document).scrollTop();
        const fullDurationInMilliSecond = 1000000; // default 1000,000

        const durationRatio = (documentHeight - scrollTop) / documentHeight

        const scrollDuration = fullDurationInMilliSecond * fastRatio * durationRatio;

        $('html, body').animate({ scrollTop: documentHeight },
            {
                duration: scrollDuration,
                easing: "linear"
            }
        )
    }


}

function stopScroll() {
    $('html, body').stop();
}

function doScrollingSample() {

    const documentHeight = $(document).height();
    const xScrollSpeed = ScrollSpeeds.GetScrollSpeed();
    if (xScrollSpeed == 0) {
        $('#textSampleScrolling').stop();
    } else {
        const fastRatio = xScrollSpeed != 0 ? 1 / xScrollSpeed : 0;
        const scrollTop = $(document).scrollTop();
        const fullDurationInMilliSecond = 1000000; // default 1000,000

        const durationRatio = (documentHeight - scrollTop) / documentHeight

        const scrollDuration = fullDurationInMilliSecond * fastRatio * durationRatio;

        $('#textSampleScrolling').animate({ scrollTop: documentHeight },
            {
                duration: scrollDuration,
                easing: "linear"
            }
        )
    }


}

function setSelectedScreenMode(vScreenMode) {
    switch (vScreenMode) {
        case ScreenModes.NORMAL:
            $(".imgTick").css("filter", "brightness(10%)");
            $("#ScreenModeNormal img").css("filter", "brightness(100%)");
            break;
        case ScreenModes.DARK:
            $(".imgTick").css("filter", "brightness(10%)");
            $("#ScreenModeDark img").css("filter", "brightness(100%)");
            break;
        case ScreenModes.LIGHT:
            $(".imgTick").css("filter", "brightness(10%)");
            $("#ScreenModeLight img").css("filter", "brightness(100%)");
            break;
        default: $("#ScreenModeDark img").css("filter", "brightness(100%)");
    }
}

// set/get App Settings

const AppSettings = {

    SetAppSettings() {
        const vScreenMode = ScreenModes.GetScreenMode();
        const vScrollSpeed = ScrollSpeeds.GetScrollSpeed();
        const vAyaFontSize = AyaFontSizes.GetAyaFontSize();
        const vCoice = ShowDemoAgainChoice.GetShowDemoAgainChoice();

        this.SetAppScreenMode(vScreenMode);
        this.SetAppScrollSpeed(vScrollSpeed);
        this.SetAppAyaFontSize(vAyaFontSize);
        this.SetAppShowDemo(vCoice);
    },

    SetAppScreenMode(vScreenMode) {
        switch (vScreenMode) {
            case ScreenModes.NORMAL:
                $("body").css('background', 'linear-gradient(90deg, rgba(243,237,209,1) 0%, rgba(248,244,217,1) 50%, rgba(241,236,213,1) 100%)');
                $(".ayaText").css('color', '#111');
                $(".ayaNumber").css('color', '#a12d2d');
                $("#Header").css('color', '#a12d2d');
                break;
            case ScreenModes.DARK:
                $("body").css('background', 'radial-gradient(circle, rgba(18,42,59,1) 0%, rgba(45,94,129,1) 50%, rgba(18,42,59,1) 100%)');
                $(".ayaText").css('color', '#f0f028');
                $(".ayaNumber").css('color', '#379b25');
                $("#Header").css('color', '#379b25');
                break;
            case ScreenModes.LIGHT:
                $("body").css('background', 'linear-gradient(90deg, rgba(242,242,242,1) 0%, rgba(247,247,247,1) 25%, rgba(254,254,254,1) 50%, rgba(247,247,247,1) 75%, rgba(242,242,242,1) 100%)');
                $(".ayaText").css('color', '#111');
                $(".ayaNumber").css('color', '#379b25');
                $("#Header").css('color', '#379b25');
                break;
            default:
                $("body").css('background', 'radial-gradient(circle, rgba(18,42,59,1) 0%, rgba(45,94,129,1) 50%, rgba(18,42,59,1) 100%)');
                $(".ayaText").css('color', '#f0f028');
                $(".ayaNumber").css('color', '#379b25');
                $("#Header").css('color', '#379b25');

        }
    },

    SetAppScrollSpeed(vScrollSpeed) {
        ScrollSpeeds.SetScrollSpeed(vScrollSpeed);
    },

    SetAppAyaFontSize(vAyaFontSizeNumber) {
        const vAyaFontSize = String(vAyaFontSizeNumber);
        switch (vAyaFontSize) {
            case AyaFontSizes.SUPER_SMALL: SetFontSize(14);
                break;
            case AyaFontSizes.VERY_SMALL: SetFontSize(16);
                break;
            case AyaFontSizes.SMALLER: SetFontSize(18);
                break;
            case AyaFontSizes.SMALLER: SetFontSize(20);
                break;
            case AyaFontSizes.MEDIUM: SetFontSize(24);
                break;
            case AyaFontSizes.LARGE: SetFontSize(32);
                break;
            case AyaFontSizes.LARGER: SetFontSize(40);
                break;
            case AyaFontSizes.VERY_LARGE: SetFontSize(48);
                break;
            case AyaFontSizes.SUPER_LARGE: SetFontSize(56);
                break;
            case AyaFontSizes.FULL_SIZE: SetFontSize(64);
                break;
            default:
                SetFontSize(24);
        }

        function SetFontSize(fontSize) {
            const fontSizeInPexils = fontSize + "px";
            $(".ayaText").css('font-size', fontSizeInPexils);
            $(".ayaNumber").css('font-size', fontSizeInPexils);
            $("#Header").css('font-size', fontSizeInPexils);
        }

    },

    SetAppShowDemo(vChoice){
        if (vChoice == ShowDemoAgainChoice.YES) {
            ShowDemoAgainChoice.ShowDemoAgian();
        } else {
            ShowDemoAgainChoice.DontShowDemoAgain();
        }
    }
}

// ###### Objects

const ScreenMode = "ScreenMode";
const ScreenModes = {
    NORMAL: 'N',
    DARK: 'D',
    LIGHT: 'L',

    SetScreenMode(vScreenMode) {
        if (isExist(vScreenMode, ScreenModes)) {
            localStorage.setItem(ScreenMode, vScreenMode);
        } else {
            localStorage.setItem(ScreenMode, ScreenModes.NORMAL);
        }
    },

    GetScreenMode() {
        var vScreenMode = localStorage.getItem(ScreenMode);
        if (vScreenMode == null || !isExist(vScreenMode, ScreenModes)) {
            vScreenMode = ScreenModes.DARK;
            this.SetScreenMode(ScreenModes.DARK);
        }

        return vScreenMode;
    }
}

const ScrollSpeed = "ScrollSpeed";
const ScrollSpeeds = {
    NO_SCROLL: "0",
    SUPER_SLOW: "1",
    VERY_SLOW: "2",
    SLOWER: "3",
    SLOW: "4",
    NORMAL: "5",
    FAST: "6",
    FASTER: "7",
    VERY_FAST: "8",
    SUPER_FAST: "9",
    FULL_SPEED: "10",

    SetScrollSpeed(vScrollSpeedNumber) {
        var vScrollSpeed = String(vScrollSpeedNumber);
        if (isExist(vScrollSpeed, ScrollSpeeds)) {
            localStorage.setItem(ScrollSpeed, vScrollSpeed);
        } else {
            localStorage.setItem(ScrollSpeed, ScrollSpeeds.NORMAL);
        }
    },

    GetScrollSpeed() {

        var vScrollSpeed = localStorage.getItem(ScrollSpeed);
        if (vScrollSpeed == null || !isExist(vScrollSpeed, ScrollSpeeds)) {
            vScrollSpeed = ScrollSpeeds.NORMAL;
            this.SetScrollSpeed(ScrollSpeeds.NORMAL);
        }

        return parseInt(vScrollSpeed);
    }
}

const AyaFontSize = "AyaFontSize";
const AyaFontSizes = {
    SUPER_SMALL: "1",
    VERY_SMALL: "2",
    SMALLER: "3",
    SMALL: "4",
    MEDIUM: "5",
    LARGE: "6",
    LARGER: "7",
    VERY_LARGE: "8",
    SUPER_LARGE: "9",
    FULL_SIZE: "10",


    SetAyaFontSize(vAyaFontSizeNumber) {
        var vAyaFontSize = String(vAyaFontSizeNumber)
        if (isExist(vAyaFontSize, AyaFontSizes)) {
            localStorage.setItem(AyaFontSize, vAyaFontSize);
        } else {
            localStorage.setItem(AyaFontSizes, AyaFontSizes.MEDIUM);
        }
    },

    GetAyaFontSize() {
        var vAyaFontSize = localStorage.getItem(AyaFontSize);
        if (vAyaFontSize == null || !isExist(vAyaFontSize, AyaFontSizes)) {
            vAyaFontSize = AyaFontSizes.MEDIUM;
            this.SetAyaFontSize(AyaFontSizes.MEDIUM);
        }

        return parseInt(vAyaFontSize);
    },

    GetAyaFontPXSize(vAyaFontSizeNumber) {
        const AyaFontPXSizes = [0, 14, 16, 18, 20, 24, 32, 40, 48, 56, 64];
        return AyaFontPXSizes[vAyaFontSizeNumber];
    }

}

const ShowDemoChoice = "ShowDemo";
const ShowDemoAgainChoice = {
    YES : "yes",
    NO : "no",

    ShowDemoAgian(){
        localStorage.setItem(ShowDemoChoice, ShowDemoAgainChoice.YES);
    },

    DontShowDemoAgain(){
        localStorage.setItem(ShowDemoChoice, ShowDemoAgainChoice.NO);

    },

    GetShowDemoAgainChoice(){
        var vChoice = localStorage.getItem(ShowDemoChoice);
        if (vChoice == null || !isExist(vChoice, ShowDemoAgainChoice)) {
        // if (vChoice == null ) {
            vChoice = ShowDemoAgainChoice.YES;
            this.ShowDemoAgian();
        }
        return vChoice;
    }
}
// ###### tools 
function isExist(value, ObjectX) {
    return Object.values(ObjectX).indexOf(value) > -1
}

// for debug
function msg(s) {
    console.log(s);
}
