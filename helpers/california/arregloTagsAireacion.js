
const generarTags = (name) => {
    arreglo = ["Num_Auto","Num_Air_On","Algun_Air_On","Hora_Ini_1","Hora_Ini_2","Hora_Fin_1","Hora_Fin_2","Alarm_Adver","Run_Rem","Bloq_Auto_Hora","Sel_Horario","Sel_50","Horas_Trab_Act","Horas_Trab_Guar"]
    arreglo2 = `[`
    arreglo.forEach(element => {
        arreglo2 = arreglo2 + `${`"${name}`.concat(".", `${element}"`).replaceAll("'", '"')},`
    });
    arreglo2 = arreglo2 + "]"
    return `${arreglo2}`
};

const generarTagsTA = (name) => {
    arreglo = ["InputsLN","OUTPUT","Num_Air_On","Horas_Trab_Act","Horas_Trab_Guar","Stat_Comm","Desactiva_TA"]
    arreglo2 = `[`
    for (let index = 0; index < name.length; index++) {
        arreglo.forEach(element => {
            arreglo2 = arreglo2 + `${`"${name[index]}`.concat(".", `${element}"`).replaceAll("'", '"')},`
            
        });
    }
    arreglo2 = arreglo2 + "]"
    return `${arreglo2}`
};

const generarTagsTCP = (name) => {
    arreglo = ["InputsLN","OUTPUT","Horas_Trab_Act","Horas_Trab_Guar","Stat_Comm","Volt_L1","Corriente_L1","Volt_L2","Corriente_L2","Volt_L3","Corriente_L3","Factor_Pot","Freq","Ener_Consu","Status_Comm_MB","Num_Air_On","Volt_L1L2","Volt_L2L3","Volt_L3L1","Volt_Trif","Corriente_Trif","Pot_Trif","Desactiva_TA","THDV_tot","THDI_tot","Alarm1","Alarm2","Temp","Pasos_Acti","Pasos_Habilit"]
    arreglo2 = `[`
    for (let index = 0; index < name.length; index++) {
        arreglo.forEach(element => {
            arreglo2 = arreglo2 + `${`"${name[index]}`.concat(".", `${element}"`).replaceAll("'", '"')},`     
        });     
    }
    arreglo2 = arreglo2 + "]"
    return `${arreglo2}`
};

const arregloTagsPC01Antenas = () => {
    return arreglo = `["PC01_TA01_Ant_Pot","PC01_TA02_Ant_Pot","PC01_TA01_Ant_Stat","PC01_TA02_Ant_Stat"]`
};

const arregloTagsPC02Antenas = () => {
    return arreglo = `["PC02_TA01_Ant_Pot","PC02_TA02_Ant_Pot","PC02_TA01_Ant_Stat","PC02_TA02_Ant_Stat"]`
};

const arregloTagsPC03Antenas = () => {
    return arreglo = `["PC03_TA01_Ant_Pot","PC03_TA02_Ant_Pot","PC03_TA03_Ant_Pot","PC03_TA01_Ant_Stat","PC03_TA02_Ant_Stat","PC03_TA03_Ant_Stat"]`
};

const arregloTagsPC04Antenas = () => {
    return arreglo = `["PC04_TA01_Ant_Pot","PC04_TA02_Ant_Pot","PC04_TA03_Ant_Pot","PC04_TA01_Ant_Stat","PC04_TA02_Ant_Stat","PC04_TA03_Ant_Stat"]`
};

const arregloTagsPC05Antenas = () => {
    return arreglo = `["PC05_TA01_Ant_Pot","PC05_TA02_Ant_Pot","PC05_TA03_Ant_Pot","PC05_TA01_Ant_Stat","PC05_TA02_Ant_Stat","PC05_TA03_Ant_Stat"]`
};

const arregloTagsPC06Antenas = () => {
    return arreglo = `["PC06_TA01_Ant_Pot","PC06_TA02_Ant_Pot","PC06_TA03_Ant_Pot","PC06_TA01_Ant_Stat","PC06_TA02_Ant_Stat","PC06_TA03_Ant_Stat"]`
};

const arregloTagsPC07Antenas = () => {
    return arreglo = `["PC07_TA01_Ant_Pot","PC07_TA02_Ant_Pot","PC07_TA03_Ant_Pot","PC07_TA01_Ant_Stat","PC07_TA02_Ant_Stat","PC07_TA03_Ant_Stat"]`
};

const arregloTagsPC08Antenas = () => {
    return arreglo = `["PC08_TA01_Ant_Pot","PC08_TA02_Ant_Pot","PC08_TA03_Ant_Pot","PC08_TA01_Ant_Stat","PC08_TA02_Ant_Stat","PC08_TA03_Ant_Stat"]`
};

const arregloTagsPC09Antenas = () => {
    return arreglo = `["PC09_TA01_Ant_Pot","PC09_TA02_Ant_Pot","PC09_TA03_Ant_Pot","PC09_TA01_Ant_Stat","PC09_TA02_Ant_Stat","PC09_TA03_Ant_Stat"]`
};

const arregloTagsPC10Antenas = () => {
    return arreglo = `["PC10_TA01_Ant_Pot","PC10_TA02_Ant_Pot","PC10_TA03_Ant_Pot","PC10_TA01_Ant_Stat","PC10_TA02_Ant_Stat","PC10_TA03_Ant_Stat"]`
};

const arregloTagsPC11Antenas = () => {
    return arreglo = `["PC11_TA01_Ant_Pot","PC11_TA02_Ant_Pot","PC11_TA03_Ant_Pot","PC11_TA01_Ant_Stat","PC11_TA02_Ant_Stat","PC11_TA03_Ant_Stat"]`
};

const arregloTagsPC12Antenas = () => {
    return arreglo = `["PC12_TA01_Ant_Pot","PC12_TA02_Ant_Pot","PC12_TA03_Ant_Pot","PC12_TA01_Ant_Stat","PC12_TA02_Ant_Stat","PC12_TA03_Ant_Stat"]`
};

const arregloTagsPC13Antenas = () => {
    return arreglo = `["PC13_TA01_Ant_Pot","PC13_TA02_Ant_Pot","PC13_TA03_Ant_Pot","PC13_TA01_Ant_Stat","PC13_TA02_Ant_Stat","PC13_TA03_Ant_Stat"]`
};

const arregloTagsPC14Antenas = () => {
    return arreglo = `["PC14_TA01_Ant_Pot","PC14_TA02_Ant_Pot","PC14_TA03_Ant_Pot","PC14_TA01_Ant_Stat","PC14_TA02_Ant_Stat","PC14_TA03_Ant_Stat"]`
};

const arregloTagsPC15Antenas = () => {
    return arreglo = `["PC15_TA01_Ant_Pot","PC15_TA02_Ant_Pot","PC15_TA03_Ant_Pot","PC15_TA04_Ant_Pot","PC15_TA01_Ant_Stat","PC15_TA02_Ant_Stat","PC15_TA03_Ant_Stat","PC15_TA04_Ant_Stat"]`
};

const arregloTagsPC16Antenas = () => {
    return arreglo = `["PC16_TA01_Ant_Pot","PC16_TA02_Ant_Pot","PC16_TA03_Ant_Pot","PC16_TA01_Ant_Stat","PC16_TA02_Ant_Stat","PC16_TA03_Ant_Stat"]`
};

const arregloTagsPC17Antenas = () => {
    return arreglo = `["PC17_TA01_Ant_Pot","PC17_TA02_Ant_Pot","PC17_TA03_Ant_Pot","PC17_TA01_Ant_Stat","PC17_TA02_Ant_Stat","PC17_TA03_Ant_Stat"]`
};

const arregloTagsPC18Antenas = () => {
    return arreglo = `["PC18_TA01_Ant_Pot","PC18_TA02_Ant_Pot","PC18_TA03_Ant_Pot","PC18_TA01_Ant_Stat","PC18_TA02_Ant_Stat","PC18_TA03_Ant_Stat"]`
};

const arregloTagsPS01Antenas = () => {
    return arreglo = `["PIS01_TA01_Ant_Pot","PIS01_TA02_Ant_Pot","PIS01_TA03_Ant_Pot","PIS01_TA04_Ant_Pot","PIS01_TA05_Ant_Pot","PIS01_TA06_Ant_Pot","PIS01_TA07_Ant_Pot","PIS01_TA08_Ant_Pot","PIS01_TA01_Ant_Stat","PIS01_TA02_Ant_Stat","PIS01_TA03_Ant_Stat","PIS01_TA04_Ant_Stat","PIS01_TA05_Ant_Stat","PIS01_TA06_Ant_Stat","PIS01_TA07_Ant_Stat","PIS01_TA08_Ant_Stat"]`
};

const arregloTagsPS02Antenas = () => {
    return arreglo = `["PIS02_TA01_Ant_Pot","PIS02_TA02_Ant_Pot","PIS02_TA03_Ant_Pot","PIS02_TA04_Ant_Pot","PIS02_TA05_Ant_Pot","PIS02_TA06_Ant_Pot","PIS02_TA07_Ant_Pot","PIS02_TA01_Ant_Stat","PIS02_TA02_Ant_Stat","PIS02_TA03_Ant_Stat","PIS02_TA04_Ant_Stat","PIS02_TA05_Ant_Stat","PIS02_TA06_Ant_Stat","PIS02_TA07_Ant_Stat"]`
};

const arregloTagsPS03Antenas = () => {
    return arreglo = `["PIS03_TA01_Ant_Pot","PIS03_TA02_Ant_Pot","PIS03_TA03_Ant_Pot","PIS03_TA04_Ant_Pot","PIS03_TA05_Ant_Pot","PIS03_TA01_Ant_Stat","PIS03_TA02_Ant_Stat","PIS03_TA03_Ant_Stat","PIS03_TA04_Ant_Stat","PIS03_TA05_Ant_Stat"]`
};

const arregloTagsPS04Antenas = () => {
    return arreglo = `["PIS04_TA01_Ant_Pot","PIS04_TA02_Ant_Pot","PIS04_TA03_Ant_Pot","PIS04_TA04_Ant_Pot","PIS04_TA01_Ant_Stat","PIS04_TA02_Ant_Stat","PIS04_TA03_Ant_Stat","PIS04_TA04_Ant_Stat"]`
};

const arregloTagsPS05Antenas = () => {
    return arreglo = `["PIS05_TA01_Ant_Pot","PIS05_TA02_Ant_Pot","PIS05_TA03_Ant_Pot","PIS05_TA04_Ant_Pot","PIS05_TA01_Ant_Stat","PIS05_TA02_Ant_Stat","PIS05_TA03_Ant_Stat","PIS05_TA04_Ant_Stat"]`
};

const arregloTagsPS06Antenas = () => {
    return arreglo = `["PIS06_TA01_Ant_Pot","PIS06_TA02_Ant_Pot","PIS06_TA03_Ant_Pot","PIS06_TA04_Ant_Pot","PIS06_TA01_Ant_Stat","PIS06_TA02_Ant_Stat","PIS06_TA03_Ant_Stat","PIS06_TA04_Ant_Stat"]`
};

const arregloTagsPS07Antenas = () => {
    return arreglo = `["PIS07_TA01_Ant_Pot","PIS07_TA02_Ant_Pot","PIS07_TA03_Ant_Pot","PIS07_TA04_Ant_Pot","PIS07_TA05_Ant_Pot","PIS07_TA06_Ant_Pot","PIS07_TA01_Ant_Stat","PIS07_TA02_Ant_Stat","PIS07_TA03_Ant_Stat","PIS07_TA04_Ant_Stat","PIS07_TA05_Ant_Stat","PIS07_TA06_Ant_Stat"]`
};

const arregloTagsPS08Antenas = () => {
    return arreglo = `["PIS08_TA01_Ant_Pot","PIS08_TA02_Ant_Pot","PIS08_TA03_Ant_Pot","PIS08_TA04_Ant_Pot","PIS08_TA05_Ant_Pot","PIS08_TA06_Ant_Pot","PIS08_TA01_Ant_Stat","PIS08_TA02_Ant_Stat","PIS08_TA03_Ant_Stat","PIS08_TA04_Ant_Stat","PIS08_TA05_Ant_Stat","PIS08_TA06_Ant_Stat"]`
};

const arregloTagsPS09Antenas = () => {
    return arreglo = `["PIS09_TA01_Ant_Pot","PIS09_TA02_Ant_Pot","PIS09_TA03_Ant_Pot","PIS09_TA04_Ant_Pot","PIS09_TA05_Ant_Pot","PIS09_TA06_Ant_Pot","PIS09_TA07_Ant_Pot","PIS09_TA08_Ant_Pot","PIS09_TA01_Ant_Stat","PIS09_TA02_Ant_Stat","PIS09_TA03_Ant_Stat","PIS09_TA04_Ant_Stat","PIS09_TA05_Ant_Stat","PIS09_TA06_Ant_Stat","PIS09_TA07_Ant_Stat","PIS09_TA08_Ant_Stat"]`
};

const arregloTagsPS10Antenas = () => {
    return arreglo = `["PIS10_TA01_Ant_Pot","PIS10_TA02_Ant_Pot","PIS10_TA03_Ant_Pot","PIS10_TA04_Ant_Pot","PIS10_TA01_Ant_Stat","PIS10_TA02_Ant_Stat","PIS10_TA03_Ant_Stat","PIS10_TA04_Ant_Stat"]`
};

const arregloTagsPS11Antenas = () => {
    return arreglo = `["PIS11_TA01_Ant_Pot","PIS11_TA02_Ant_Pot","PIS11_TA03_Ant_Pot","PIS11_TA04_Ant_Pot","PIS11_TA05_Ant_Pot","PIS11_TA06_Ant_Pot","PIS11_TA07_Ant_Pot","PIS11_TA01_Ant_Stat","PIS11_TA02_Ant_Stat","PIS11_TA03_Ant_Stat","PIS11_TA04_Ant_Stat","PIS11_TA05_Ant_Stat","PIS11_TA06_Ant_Stat","PIS11_TA07_Ant_Stat"]`
};

const arregloTagsPS12Antenas = () => {
    return arreglo = `["PIS12_TA01_Ant_Pot","PIS12_TA02_Ant_Pot","PIS12_TA03_Ant_Pot","PIS12_TA04_Ant_Pot","PIS12_TA05_Ant_Pot","PIS12_TA06_Ant_Pot","PIS12_TA01_Ant_Stat","PIS12_TA02_Ant_Stat","PIS12_TA03_Ant_Stat","PIS12_TA04_Ant_Stat","PIS12_TA06_Ant_Stat"]`
};

const arregloTagsPS13Antenas = () => {
    return arreglo = `["PIS13_TA01_Ant_Pot","PIS13_TA02_Ant_Pot","PIS13_TA03_Ant_Pot","PIS13_TA04_Ant_Pot","PIS13_TA05_Ant_Pot","PIS13_TA06_Ant_Pot","PIS13_TA07_Ant_Pot","PIS13_TA08_Ant_Pot","PIS13_TA01_Ant_Stat","PIS13_TA02_Ant_Stat","PIS13_TA03_Ant_Stat","PIS13_TA04_Ant_Stat","PIS13_TA05_Ant_Stat","PIS13_TA06_Ant_Stat","PIS13_TA07_Ant_Stat","PIS13_TA08_Ant_Stat"]`
};

const arregloTagsPS14Antenas = () => {
    return arreglo = `["PIS14_TA01_Ant_Pot","PIS14_TA02_Ant_Pot","PIS14_TA03_Ant_Pot","PIS14_TA04_Ant_Pot","PIS14_TA05_Ant_Pot","PIS14_TA06_Ant_Pot","PIS14_TA07_Ant_Pot","PIS14_TA01_Ant_Stat","PIS14_TA02_Ant_Stat","PIS14_TA03_Ant_Stat","PIS14_TA04_Ant_Stat","PIS14_TA05_Ant_Stat","PIS14_TA06_Ant_Stat","PIS14_TA07_Ant_Stat"]`
};

const arregloTagsPS15Antenas = () => {
    return arreglo = `["PIS15_TA01_Ant_Pot","PIS15_TA02_Ant_Pot","PIS15_TA03_Ant_Pot","PIS15_TA04_Ant_Pot","PIS15_TA05_Ant_Pot","PIS15_TA06_Ant_Pot","PIS15_TA07_Ant_Pot","PIS15_TA01_Ant_Stat","PIS15_TA02_Ant_Stat","PIS15_TA03_Ant_Stat","PIS15_TA04_Ant_Stat","PIS15_TA05_Ant_Stat","PIS15_TA06_Ant_Stat","PIS15_TA07_Ant_Stat"]`
};

const arregloTagsPS16Antenas = () => {
    return arreglo = `["PIS16_TA01_Ant_Pot","PIS16_TA02_Ant_Pot","PIS16_TA03_Ant_Pot","PIS16_TA04_Ant_Pot","PIS16_TA05_Ant_Pot","PIS16_TA06_Ant_Pot","PIS16_TA01_Ant_Stat","PIS16_TA02_Ant_Stat","PIS16_TA03_Ant_Stat","PIS16_TA04_Ant_Stat","PIS16_TA05_Ant_Stat","PIS16_TA06_Ant_Stat"]`
};

const arregloTagsPS17Antenas = () => {
    return arreglo = `["PIS17_TA01_Ant_Pot","PIS17_TA02_Ant_Pot","PIS17_TA03_Ant_Pot","PIS17_TA04_Ant_Pot","PIS17_TA05_Ant_Pot","PIS17_TA06_Ant_Pot","PIS17_TA01_Ant_Stat","PIS17_TA02_Ant_Stat","PIS17_TA03_Ant_Stat","PIS17_TA04_Ant_Stat","PIS17_TA05_Ant_Stat","PIS17_TA06_Ant_Stat"]`
};

const arregloTagsPS18Antenas = () => {
    return arreglo = `["PIS18_TA01_Ant_Pot","PIS18_TA02_Ant_Pot","PIS18_TA03_Ant_Pot","PIS18_TA04_Ant_Pot","PIS18_TA05_Ant_Pot","PIS18_TA06_Ant_Pot","PIS18_TA01_Ant_Stat","PIS18_TA02_Ant_Stat","PIS18_TA03_Ant_Stat","PIS18_TA04_Ant_Stat","PIS18_TA05_Ant_Stat","PIS18_TA06_Ant_Stat"]`
};

const arregloTagsPS19Antenas = () => {
    return arreglo = `["PIS19_TA01_Ant_Pot","PIS19_TA02_Ant_Pot","PIS19_TA03_Ant_Pot","PIS19_TA04_Ant_Pot","PIS19_TA05_Ant_Pot","PIS19_TA01_Ant_Stat","PIS19_TA02_Ant_Stat","PIS19_TA03_Ant_Stat","PIS19_TA04_Ant_Stat","PIS19_TA05_Ant_Stat"]`
};

const arregloTagsPS20Antenas = () => {
    return arreglo = `["PIS20_TA01_Ant_Pot","PIS20_TA02_Ant_Pot","PIS20_TA03_Ant_Pot","PIS20_TA04_Ant_Pot","PIS20_TA05_Ant_Pot","PIS20_TA06_Ant_Pot","PIS20_TA01_Ant_Stat","PIS20_TA02_Ant_Stat","PIS20_TA03_Ant_Stat","PIS20_TA04_Ant_Stat","PIS20_TA05_Ant_Stat","PIS20_TA06_Ant_Stat"]`
};

const arregloTagsAntenasSectoriales = () => {
    return arreglo = `["Ant_Pot_AP1","Ant_Pot_AP2","Ant_Pot_AP3","Ant_Pot_AP4","Ant_Pot_AP5","Ant_Pot_CAMP-PTP-TO","Ant_Pot_EB-SHELTER","Ant_Pot_TO-PTP-CAMP","Ant_Stat_AP1","Ant_Stat_AP2","Ant_Stat_AP3","Ant_Stat_AP4","Ant_Stat_AP5","Ant_Stat_CAMP-PTP-TO","Ant_Stat_EB-SHELTER","Ant_Stat_TO-PTP-CAMP"]`
};

const arregloTagsPiscinasGeneral = () => {
    return arreglo = `["PC_01.Algun_Air_On","PC_01.Num_Air_On","PC_01.Alarm_Adver","PC_02.Algun_Air_On","PC_02.Num_Air_On","PC_02.Alarm_Adver","PC_03.Algun_Air_On","PC_03.Num_Air_On","PC_03.Alarm_Adver","PC_04.Algun_Air_On","PC_04.Num_Air_On","PC_04.Alarm_Adver","PC_05.Algun_Air_On","PC_05.Num_Air_On","PC_05.Alarm_Adver","PC_06.Algun_Air_On","PC_06.Num_Air_On","PC_06.Alarm_Adver","PC_07.Algun_Air_On","PC_07.Num_Air_On","PC_07.Alarm_Adver","PC_08.Algun_Air_On","PC_08.Num_Air_On","PC_08.Alarm_Adver","PC_09.Algun_Air_On","PC_09.Num_Air_On","PC_09.Alarm_Adver","PC_10.Algun_Air_On","PC_10.Num_Air_On","PC_10.Alarm_Adver","PC_11.Algun_Air_On","PC_11.Num_Air_On","PC_11.Alarm_Adver","PC_12.Algun_Air_On","PC_12.Num_Air_On","PC_12.Alarm_Adver","PC_13.Algun_Air_On","PC_13.Num_Air_On","PC_13.Alarm_Adver","PC_14.Algun_Air_On","PC_14.Num_Air_On","PC_14.Alarm_Adver","PC_15.Algun_Air_On","PC_15.Num_Air_On","PC_15.Alarm_Adver","PC_16.Algun_Air_On","PC_16.Num_Air_On","PC_16.Alarm_Adver","PC_17.Algun_Air_On","PC_17.Num_Air_On","PC_17.Alarm_Adver","PC_18.Algun_Air_On","PC_18.Num_Air_On","PC_18.Alarm_Adver","PIS_01.Algun_Air_On","PIS_01.Num_Air_On","PIS_01.Alarm_Adver","PIS_02.Algun_Air_On","PIS_02.Num_Air_On","PIS_02.Alarm_Adver","PIS_03.Algun_Air_On","PIS_03.Num_Air_On","PIS_03.Alarm_Adver","PIS_04.Algun_Air_On","PIS_04.Num_Air_On","PIS_04.Alarm_Adver","PIS_05.Algun_Air_On","PIS_05.Num_Air_On","PIS_05.Alarm_Adver","PIS_06.Algun_Air_On","PIS_06.Num_Air_On","PIS_06.Alarm_Adver","PIS_07.Algun_Air_On","PIS_07.Num_Air_On","PIS_07.Alarm_Adver","PIS_08.Algun_Air_On","PIS_08.Num_Air_On","PIS_08.Alarm_Adver","PIS_09.Algun_Air_On","PIS_09.Num_Air_On","PIS_09.Alarm_Adver","PIS_10.Algun_Air_On","PIS_10.Num_Air_On","PIS_10.Alarm_Adver","PIS_11.Algun_Air_On","PIS_11.Num_Air_On","PIS_11.Alarm_Adver","PIS_12.Algun_Air_On","PIS_12.Num_Air_On","PIS_12.Alarm_Adver","PIS_13.Algun_Air_On","PIS_13.Num_Air_On","PIS_13.Alarm_Adver","PIS_14.Algun_Air_On","PIS_14.Num_Air_On","PIS_14.Alarm_Adver","PIS_15.Algun_Air_On","PIS_15.Num_Air_On","PIS_15.Alarm_Adver","PIS_16.Algun_Air_On","PIS_16.Num_Air_On","PIS_16.Alarm_Adver","PIS_17.Algun_Air_On","PIS_17.Num_Air_On","PIS_17.Alarm_Adver","PIS_18.Algun_Air_On","PIS_18.Num_Air_On","PIS_18.Alarm_Adver","PIS_19.Algun_Air_On","PIS_19.Num_Air_On","PIS_19.Alarm_Adver","PIS_20.Algun_Air_On","PIS_20.Num_Air_On","PIS_20.Alarm_Adver"]`
};



module.exports = {
    arregloTagsPC01Antenas,
    arregloTagsPC02Antenas,
    arregloTagsPC03Antenas,
    arregloTagsPC04Antenas,
    arregloTagsPC05Antenas,
    arregloTagsPC06Antenas,
    arregloTagsPC07Antenas,
    arregloTagsPC08Antenas,
    arregloTagsPC09Antenas,
    arregloTagsPC10Antenas,
    arregloTagsPC11Antenas,
    arregloTagsPC12Antenas,
    arregloTagsPC13Antenas,
    arregloTagsPC14Antenas,
    arregloTagsPC15Antenas,
    arregloTagsPC16Antenas,
    arregloTagsPC17Antenas,
    arregloTagsPC18Antenas,
    arregloTagsPS01Antenas,
    arregloTagsPS02Antenas,
    arregloTagsPS03Antenas,
    arregloTagsPS04Antenas,
    arregloTagsPS05Antenas,
    arregloTagsPS06Antenas,
    arregloTagsPS07Antenas,
    arregloTagsPS08Antenas,
    arregloTagsPS09Antenas,
    arregloTagsPS10Antenas,
    arregloTagsPS11Antenas,
    arregloTagsPS12Antenas,
    arregloTagsPS13Antenas,
    arregloTagsPS14Antenas,
    arregloTagsPS15Antenas,
    arregloTagsPS16Antenas,
    arregloTagsPS17Antenas,
    arregloTagsPS18Antenas,
    arregloTagsPS19Antenas,
    arregloTagsPS20Antenas,
    arregloTagsAntenasSectoriales,
    generarTags,
    generarTagsTA,
    generarTagsTCP,
    arregloTagsPiscinasGeneral
}