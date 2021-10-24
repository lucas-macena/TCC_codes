clear all
close all
clc

T = readtable('dados_rpm.xlsx');

eof = 46; % ultima linha com valores úteis de rpm

rpm=table2array(T(2:eof,3));
Ts = 0.1; % período de amostragem

u = 560*ones(1,length(rpm));
t = [0:length(rpm)-1]*Ts;

K = mean(rpm(end-30:end))/u(1);
tau = 1.4;

G = tf(K,[tau 1]);
Gd = c2d(G,5*Ts);

tsim=[0:length(rpm)-1]*5*Ts;
yest = lsim(Gd,u,tsim);
plot(t,rpm,t,yest(1:length(t)),'r');

disp('Modelo do sistema:')
Gd

rltool(Gd)