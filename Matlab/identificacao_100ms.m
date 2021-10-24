clear all
close all
clc

T = readtable('dados_rpm_codesys.xlsx');

eof = 241; % ultima linha com valores úteis de rpm

rpm=table2array(T(2:eof,3));
Ts = 0.1; % período de amostragem

u = 600*ones(1,length(rpm));
t = [0:length(rpm)-1]*Ts;

K = mean(rpm(end-30:end))/u(1);
tau = 0.21;

G = tf(K,[tau 1]);
Gd = c2d(G,Ts);

yest = lsim(Gd,u,t);
plot(t,rpm,t,yest,'r');

disp('Modelo do sistema:')
Gd


rltool(Gd)