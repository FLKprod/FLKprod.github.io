import pygame
from pygame.locals import *
import time
import os
import sys
import math
import uuid

pygame.init()

def game ():    #fenetre 800*700
    ingame=True
    tour=1
    argent=5000
    font=pygame.font.SysFont(None,70)
    font_j=pygame.font.SysFont(None,50)
    aff_txt=font.render("Round n° ",1,(50,50,255))
    aff_def=font.render("Defense",1,(255,50,50))
    aff_att=font.render("Attaque",1,(255,50,50))
    aff_txtjoueur=font_j.render("Joueur ",1,(255,255,255))

    def affichage(arg1,arg2):   #argt1=joueur1/2    arg2=1defense/2attaque
        fenetre.fill([0,0,0])
        aff_tour=font.render(str(tour),1,(255,255,50))
        aff_nbrjoueur=font_j.render(str(arg1),1,(255,255,50))
        fenetre.blit(aff_txt,(270,300))
        fenetre.blit(aff_tour,(495,300))
        fenetre.blit(aff_txtjoueur,(325,410))
        fenetre.blit(aff_nbrjoueur,(475,410))
        if arg2==1:
            fenetre.blit(aff_def,(310,100))
        else:
            fenetre.blit(aff_att,(310,100))
        pygame.display.flip()
        click=False
        while click==False:
            for event in pygame.event.get():
                if event.type==QUIT:
                    pygame.quit()
                    quit()
                if event.type == pygame.MOUSEBUTTONDOWN and event.button==1:
                    click=True
    while ingame==True:
        affichage(1,1)
        defense(1)
        affichage(2,1)
        defense(2)
        affichage(1,2)
        attaque(1)
        affichage(2,2)
        attaque(2)
        if tour==2:
            player1save["Gold"]+=argent
            player2save["Gold"]+=argent
        else:
            player1save["Gold"]+=argent+int((10/100)*argent)
            player2save["Gold"]+=argent+int((10/100)*argent)
            argent=argent+int((10/100)*argent)
        fenetre.fill([153,51,0])
        if gagner!=0:
            if gagner==1:   #joueur 1 gagne
                fenetre.blit(texture["1Win"],(0,400))
            elif gagner==2:   #joueur 2 gagne
                fenetre.blit(texture["2Win"],(0,400))
            elif gagner==3:   #egalite parfaite
                fenetre.blit(texture["draw"],(0,400))
            click=False
            pygame.display.flip()
            while click==False:
                for event in pygame.event.get():
                    if event.type==QUIT:
                        pygame.quit()
                        quit()
                    if event.type == pygame.MOUSEBUTTONDOWN and event.button==1:
                        click=True
            ingame=False
        else:   #aucune des deux tours est detruite
            tour+=1

def initialization():
    global texture,player1save,player2save,gagner
    texture={}
    texture["fond"]=pygame.image.load("fondPrincipal.png").convert()
    texture["bouton1A"]=pygame.image.load("Bouton 1 Appuye.png").convert()
    texture["bouton1"]=pygame.image.load("Bouton 1.png").convert()
    texture["bouton2"]=pygame.image.load("Bouton 2.png").convert()
    texture["bouton2A"]=pygame.image.load("Bouton 2 Appuye.png").convert()
    texture["bouton3"]=pygame.image.load("Bouton 3.png").convert()
    texture["bouton3A"]=pygame.image.load("Bouton 3 Appuye.png").convert()

    texture["boutonBUILD"]=pygame.image.load("Bouton BUILD.png").convert()
    texture["boutonBUILDA"]=pygame.image.load("Bouton BUILD Appuye.png").convert()
    texture["boutonUP"]=pygame.image.load("Bouton LVL UP.png").convert()
    texture["boutonUPA"]=pygame.image.load("Bouton LVL UP Appuye.png").convert()
    texture["boutonPLAY"]=pygame.image.load("Bouton Play.png").convert()
    texture["boutonPLAYA"]=pygame.image.load("Bouton Play Appuye.png").convert()
    texture["boutonREPAIR"]=pygame.image.load("Bouton REPAIR.png").convert()
    texture["boutonREPAIRA"]=pygame.image.load("Bouton REPAIR Appuye.png").convert()
    texture["boutonRULES"]=pygame.image.load("Bouton Rules.png").convert()
    texture["boutonRULESA"]=pygame.image.load("Bouton Rules Appuye.png").convert()

    texture["Muraille"]=pygame.image.load("Muraille.png").convert()
    texture["TOUR1"]=pygame.image.load("Tour lv1.png").convert()
    texture["TOUR2"]=pygame.image.load("tour lv2.png").convert()
    texture["TOUR3"]=pygame.image.load("Tour lv3.png").convert()

    texture["Géant"]=pygame.image.load("geant.png").convert_alpha()
    texture["Barbare"]=pygame.image.load("Barbare.png").convert_alpha()
    texture["Militaire"]=pygame.image.load("Militaire.png").convert_alpha()

    texture["1Win"]=pygame.image.load("1 win.png").convert()
    texture["2Win"]=pygame.image.load("2 win.png").convert()
    texture["draw"]=pygame.image.load("Draw.png").convert()

    #initialization des textures (on les place dans un dictionnaire)

    player1save={}
    player1save["Muraille1"]=False
    player1save["PVMuraille1"]=0
    player1save["LVLMuraille1"]=1
    player1save["Tour1Muraille1"]=0
    player1save["lvlTourMuraille1"]=1
    player1save["Muraille2"]=False
    player1save["PVMuraille2"]=0
    player1save["LVLMuraille2"]=1
    player1save["Tour1Muraille2"]=0
    player1save["lvlTourMuraille2"]=1
    player1save["Muraille3"]=False
    player1save["PVMuraille3"]=0
    player1save["LVLMuraille3"]=1
    player1save["Tour1Muraille3"]=0
    player1save["lvlTourMuraille3"]=1
    player1save["Gold"]=6000

    #initialization des defenses et de l'argent du joueur 1

    player2save={}
    player2save["Muraille1"]=False
    player2save["PVMuraille1"]=0
    player2save["LVLMuraille1"]=1
    player2save["Tour1Muraille1"]=0
    player2save["lvlTourMuraille1"]=1
    player2save["Muraille2"]=False
    player2save["PVMuraille2"]=0
    player2save["LVLMuraille2"]=1
    player2save["Tour1Muraille2"]=0
    player2save["lvlTourMuraille2"]=1
    player2save["Muraille3"]=False
    player2save["PVMuraille3"]=0
    player2save["LVLMuraille3"]=1
    player2save["Tour1Muraille3"]=0
    player2save["lvlTourMuraille3"]=1
    player2save["Gold"]=6000

    #initialization des defenses et de l'argent du joueur 2

    gagner = 0 #Mise en place de la variable de victoire

    game()

def defense (joueur):
    global player1save,player2save,gagner
    minu=1
    sec=30
    indef=True
    boutonba=0
    vietour=0

    eventtps=pygame.USEREVENT+1
    pygame.time.set_timer(eventtps,1000)

    bouton1_M=False
    bouton2_M=False
    bouton3_M=False

    bouton1_t1=False
    bouton2_t1=False
    bouton3_t1=False

    bouton1_t2=False
    bouton2_t2=False
    bouton3_t2=False

    bouton1_t3=False
    bouton2_t3=False
    bouton3_t3=False

    boutonb_M=False
    boutonr_M=False
    boutonu_M=False

    boutonb_t1=False
    boutonu_t1=False

    boutonb_t2=False
    boutonu_t2=False

    boutonb_t3=False
    boutonu_t3=False
    fond_text=pygame.font.SysFont("arial",28)
    txt_tour=pygame.font.SysFont(None,25)
    def update():
        nonlocal bouton1_M,bouton2_M,bouton3_M,bouton1_t1,bouton2_t1,bouton3_t1
        nonlocal bouton1_t2,bouton2_t2,bouton3_t2,bouton1_t3,bouton2_t3,bouton3_t3
        nonlocal boutonb_M,boutonr_M,boutonu_M,boutonb_t1,boutonu_t1,boutonb_t2
        nonlocal boutonu_t2,boutonb_t3,boutonu_t3
        fenetre.blit(texture["fond"],(0,0))
        if joueur==1:
            afftune=fond_text.render(str(player1save["Gold"]),1,(255,255,0))
        else:
            afftune=fond_text.render(str(player2save["Gold"]),1,(255,255,0))
        fenetre.blit(afftune,(15,10))
        #Affichage du temps
        afftps=fond_text.render(str(str(minu)+":"+str(sec)),1,(210,210,210))
        fenetre.blit(afftps,(615,10))
        #Affichage murailles/tours
        if joueur==1:
            if player1save["Muraille1"]==True:
                fenetre.blit(texture["Muraille"],(283,242))
                if player1save["Tour1Muraille1"]==1:
                    fenetre.blit(texture["TOUR1"],(283,307))
                elif player1save["Tour1Muraille1"]==2:
                    fenetre.blit(texture["TOUR2"],(283,307))
                elif player1save["Tour1Muraille1"]==3:
                    fenetre.blit(texture["TOUR3"],(283,307))
                if player1save["LVLMuraille1"]==1 and vietour==1:
                    affvitr1=txt_tour.render(str(int(player1save["PVMuraille1"]*100/1000))+"%",1,(255,255,255))
                    fenetre.blit(affvitr1,(287,210))
                elif player1save["LVLMuraille1"]==2 and vietour==1:
                    affvitr1=txt_tour.render(str(int(player1save["PVMuraille1"]*100/2000))+"%",1,(255,255,255))
                    fenetre.blit(affvitr1,(287,210))
            if player1save["Muraille2"]==True:
                fenetre.blit(texture["Muraille"],(458,77))
                if player1save["Tour1Muraille2"]==1:
                    fenetre.blit(texture["TOUR1"],(458,142))
                elif player1save["Tour1Muraille2"]==2:
                    fenetre.blit(texture["TOUR2"],(458,142))
                elif player1save["Tour1Muraille2"]==3:
                    fenetre.blit(texture["TOUR3"],(458,142))
                if player1save["LVLMuraille2"]==1 and vietour==2:
                    affvitr2=txt_tour.render(str(int(player1save["PVMuraille2"]*100/1000))+"%",1,(255,255,255))
                    fenetre.blit(affvitr2,(461,45))
                elif player1save["LVLMuraille2"]==2 and vietour==2:
                    affvitr2=txt_tour.render(str(int(player1save["PVMuraille2"]*100/2000))+"%",1,(255,255,255))
                    fenetre.blit(affvitr2,(461,45))
            if player1save["Muraille3"]==True:
                fenetre.blit(texture["Muraille"],(630,376))
                if player1save["Tour1Muraille3"]==1:
                    fenetre.blit(texture["TOUR1"],(630,441))
                elif player1save["Tour1Muraille3"]==2:
                    fenetre.blit(texture["TOUR2"],(630,441))
                elif player1save["Tour1Muraille3"]==3:
                    fenetre.blit(texture["TOUR3"],(630,441))
                if player1save["LVLMuraille3"]==1 and vietour==3:
                    affvitr3=txt_tour.render(str(int(player1save["PVMuraille3"]*100/1000))+"%",1,(255,255,255))
                    fenetre.blit(affvitr3,(636,344))
                elif player1save["LVLMuraille3"]==2 and vietour==3:
                    affvitr3=txt_tour.render(str(int(player1save["PVMuraille3"]*100/2000))+"%",1,(255,255,255))
                    fenetre.blit(affvitr3,(636,344))
        else:
            if player2save["Muraille1"]==True:
                fenetre.blit(texture["Muraille"],(283,242))
                if player2save["Tour1Muraille1"]==1:
                    fenetre.blit(texture["TOUR1"],(283,307))
                elif player2save["Tour1Muraille1"]==2:
                    fenetre.blit(texture["TOUR2"],(283,307))
                elif player2save["Tour1Muraille1"]==3:
                    fenetre.blit(texture["TOUR3"],(283,307))
                if player2save["LVLMuraille1"]==1 and vietour==1:
                    affvitr1=txt_tour.render(str(int(player2save["PVMuraille1"]*100/1000))+"%",1,(255,255,255))
                    fenetre.blit(affvitr1,(287,210))
                elif player2save["LVLMuraille1"]==2 and vietour==1:
                    affvitr1=txt_tour.render(str(int(player2save["PVMuraille1"]*100/2000))+"%",1,(255,255,255))
                    fenetre.blit(affvitr1,(287,210))
            if player2save["Muraille2"]==True:
                fenetre.blit(texture["Muraille"],(458,77))
                if player2save["Tour1Muraille2"]==1:
                    fenetre.blit(texture["TOUR1"],(458,142))
                elif player2save["Tour1Muraille2"]==2:
                    fenetre.blit(texture["TOUR2"],(458,142))
                elif player2save["Tour1Muraille2"]==3:
                    fenetre.blit(texture["TOUR3"],(458,142))
                if player2save["LVLMuraille2"]==1 and vietour==2:
                    affvitr2=txt_tour.render(str(int(player2save["PVMuraille2"]*100/1000))+"%",1,(255,255,255))
                    fenetre.blit(affvitr2,(461,45))
                elif player2save["LVLMuraille2"]==2 and vietour==2:
                    affvitr2=txt_tour.render(str(int(player2save["PVMuraille2"]*100/2000))+"%",1,(255,255,255))
                    fenetre.blit(affvitr2,(461,45))
            if player2save["Muraille3"]==True:
                fenetre.blit(texture["Muraille"],(630,376))
                if player2save["Tour1Muraille3"]==1:
                    fenetre.blit(texture["TOUR1"],(630,441))
                elif player2save["Tour1Muraille3"]==2:
                    fenetre.blit(texture["TOUR2"],(630,441))
                elif player2save["Tour1Muraille3"]==3:
                    fenetre.blit(texture["TOUR3"],(630,441))
                if player2save["LVLMuraille3"]==1 and vietour==3:
                    affvitr3=txt_tour.render(str(int(player2save["PVMuraille3"]*100/1000))+"%",1,(255,255,255))
                    fenetre.blit(affvitr3,(636,344))
                elif player2save["LVLMuraille3"]==2 and vietour==3:
                    affvitr3=txt_tour.render(str(int(player2save["PVMuraille3"]*100/2000))+"%",1,(255,255,255))
                    fenetre.blit(affvitr3,(636,344))
        #BoutonsMurailles
        if bouton1_M==True:
            fenetre.blit(texture["bouton1A"],(13,626))
        else:
            fenetre.blit(texture["bouton1"],(13,626))
        if bouton2_M==True:
            fenetre.blit(texture["bouton2A"],(75,626))
        else:
            fenetre.blit(texture["bouton2"],(75,626))
        if bouton3_M==True:
            fenetre.blit(texture["bouton3A"],(137,626))
        else:
            fenetre.blit(texture["bouton3"],(137,626))
        if boutonb_M==True:
            fenetre.blit(texture["boutonBUILDA"],(13,667))
        else:
           fenetre.blit(texture["boutonBUILD"],(13,667))
        if boutonu_M==True:
            fenetre.blit(texture["boutonUPA"],(75,667))
        else:
            fenetre.blit(texture["boutonUP"],(75,667))
        if boutonr_M==True:
            fenetre.blit(texture["boutonREPAIRA"],(137,667))
        else:
            fenetre.blit(texture["boutonREPAIR"],(137,667))
        #BontonsTour1
        if bouton1_t1==True:
            fenetre.blit(texture["bouton1A"],(213,626))
        else:
            fenetre.blit(texture["bouton1"],(213,626))
        if bouton2_t1==True:
            fenetre.blit(texture["bouton2A"],(275,626))
        else:
            fenetre.blit(texture["bouton2"],(275,626))
        if bouton3_t1:
            fenetre.blit(texture["bouton3A"],(339,626))
        else:
            fenetre.blit(texture["bouton3"],(339,626))
        if boutonb_t1==True:
            fenetre.blit(texture["boutonBUILDA"],(244,667))
        else:
            fenetre.blit(texture["boutonBUILD"],(244,667))
        if boutonu_t1==True:
            fenetre.blit(texture["boutonUPA"],(306,667))
        else:
            fenetre.blit(texture["boutonUP"],(306,667))
        #BoutonsTour2
        if bouton1_t2==True:
            fenetre.blit(texture["bouton1A"],(413,626))
        else:
            fenetre.blit(texture["bouton1"],(413,626))
        if bouton2_t2==True:
            fenetre.blit(texture["bouton2A"],(475,626))
        else:
            fenetre.blit(texture["bouton2"],(475,626))
        if bouton3_t2==True:
            fenetre.blit(texture["bouton3A"],(537,626))
        else:
            fenetre.blit(texture["bouton3"],(537,626))
        if boutonb_t2==True:
            fenetre.blit(texture["boutonBUILDA"],(444,667))
        else:
            fenetre.blit(texture["boutonBUILD"],(444,667))
        if boutonu_t2==True:
            fenetre.blit(texture["boutonUPA"],(506,667))
        else:
            fenetre.blit(texture["boutonUP"],(506,667))
        #BoutonsTour3
        if bouton1_t3==True:
            fenetre.blit(texture["bouton1A"],(613,626))
        else:
            fenetre.blit(texture["bouton1"],(613,626))
        if bouton2_t3==True:
            fenetre.blit(texture["bouton2A"],(675,626))
        else:
            fenetre.blit(texture["bouton2"],(675,626))
        if bouton3_t3==True:
            fenetre.blit(texture["bouton3A"],(737,626))
        else:
            fenetre.blit(texture["bouton3"],(737,626))
        if boutonb_t3==True:
            fenetre.blit(texture["boutonBUILDA"],(644,667))
        else:
            fenetre.blit(texture["boutonBUILD"],(644,667))
        if boutonu_t3==True:
            fenetre.blit(texture["boutonUPA"],(706,667))
        else:
            fenetre.blit(texture["boutonUP"],(706,667))
        pygame.display.flip()
    #Fonction temps
    def time ():
        nonlocal sec,minu,indef
        if sec==0:
            if minu==0:
                indef=False
            else:
                minu=minu-1
                sec=59
        else:
            sec=sec-1


    while indef==True:
        update()
        for event in pygame.event.get():
            if event.type==eventtps:
                time()
            elif event.type == pygame.QUIT:
                pygame.quit()
                quit()
            elif event.type == pygame.MOUSEMOTION:#on bouge juste la souris
                if event.pos[1]>281 and event.pos[1]<382 and event.pos[0]>283 and event.pos[0]<334:
                    vietour=1
                elif event.pos[1]>118 and event.pos[1]<218 and event.pos[0]>458 and event.pos[0]<509:
                    vietour=2
                elif event.pos[1]>416 and event.pos[1]<518 and event.pos[0]>629 and event.pos[0]<681:
                    vietour=3
                else:
                    vietour=0
                if event.pos[1]>625 and event.pos[1]<652:
                    if event.pos[0]>12 and event.pos[0]<64:
                        bouton1_M=True
                    else:
                        bouton1_M=False
                    if event.pos[0]>73 and event.pos[0]<126:
                        bouton2_M=True
                    else:
                        bouton2_M=False
                    if event.pos[0]>135 and event.pos[0]<187:
                        bouton3_M=True
                    else:
                        bouton3_M=False
                    if event.pos[0]>211 and event.pos[0]<263:
                        bouton1_t1=True
                    else:
                        bouton1_t1=False
                    if event.pos[0]>273 and event.pos[0]<326:
                        bouton2_t1=True
                    else:
                        bouton2_t1=False
                    if event.pos[0]>337 and event.pos[0]<389:
                        bouton3_t1=True
                    else:
                        bouton3_t1=False
                    if event.pos[0]>412 and event.pos[0]<464:
                        bouton1_t2=True
                    else:
                        bouton1_t2=False
                    if event.pos[0]>474 and event.pos[0]<526:
                        bouton2_t2=True
                    else:
                        bouton2_t2=False
                    if event.pos[0]>536 and event.pos[0]<588:
                        bouton3_t2=True
                    else:
                        bouton3_t2=False
                    if event.pos[0]>612 and event.pos[0]<664:
                        bouton1_t3=True
                    else:
                        bouton1_t3=False
                    if event.pos[0]>674 and event.pos[0]<726:
                        bouton2_t3=True
                    else:
                        bouton2_t3=False
                    if event.pos[0]>736 and event.pos[0]<788:
                        bouton3_t3=True
                    else:
                        bouton3_t3=False
                elif event.pos[1] > 667 and event.pos[1] < 692:#boutonba
                    if event.pos[0]>12 and event.pos[0]<64:
                        boutonb_M=True
                    elif (event.pos[0]<12 or event.pos[0]>64) and boutonba!=1:
                        boutonb_M=False
                    if event.pos[0]>74 and event.pos[0]<126:
                        boutonu_M=True
                    elif (event.pos[0]<74 or event.pos[0]>126) and boutonba!=2:
                        boutonu_M=False
                    if event.pos[0]>136 and event.pos[0]<188:
                        boutonr_M=True
                    elif (event.pos[0]<136 or event.pos[0]>188) and boutonba!=3:
                        boutonr_M=False
                    if event.pos[0]>243 and event.pos[0]<295:
                        boutonb_t1=True
                    elif (event.pos[0]<243 or event.pos[0]>295) and boutonba!=4:
                        boutonb_t1=False
                    if event.pos[0]>305 and event.pos[0]<357:
                        boutonu_t1=True
                    elif (event.pos[0]<305 or event.pos[0]>357) and boutonba!=5:
                        boutonu_t1=False
                    if event.pos[0]>443 and event.pos[0]<495:
                        boutonb_t2=True
                    elif (event.pos[0]<443 or event.pos[0]>495) and boutonba!=6:
                        boutonb_t2=False
                    if event.pos[0]>505 and event.pos[0]<557:
                        boutonu_t2=True
                    elif (event.pos[0]<505 or event.pos[0]>557) and boutonba!=7:
                        boutonu_t2=False
                    if event.pos[0]>643 and event.pos[0]<695:
                        boutonb_t3=True
                    elif (event.pos[0]<643 or event.pos[0]>695) and boutonba!=8:
                        boutonb_t3=False
                    if event.pos[0]>705 and event.pos[0]<757:
                        boutonu_t3=True
                    elif (event.pos[0]<705 or event.pos[0]>757) and boutonba!=9:
                        boutonu_t3=False
                else:
                    bouton1_M=False
                    bouton2_M=False
                    bouton3_M=False
                    bouton1_t1=False
                    bouton2_t1=False
                    bouton3_t1=False
                    bouton1_t2=False
                    bouton2_t2=False
                    bouton3_t2=False
                    bouton1_t3=False
                    bouton2_t3=False
                    bouton3_t3=False
                    if boutonba != 1:
                        boutonb_M = False
                    if boutonba != 2:
                        boutonu_M = False
                    if boutonba != 3:
                        boutonr_M = False
                    if boutonba != 4:
                        boutonb_t1 = False
                    if boutonba != 5:
                        boutonu_t1 = False
                    if boutonba != 6:
                        boutonb_t2 = False
                    if boutonba != 7:
                        boutonu_t2 = False
                    if boutonba != 8:
                        boutonb_t3 = False
                    if boutonba != 9:
                        boutonu_t3 = False
            elif event.type == pygame.MOUSEBUTTONDOWN and event.button == 1:
                if event.pos[1]>0 and event.pos[1]<52 and event.pos[0]>542 and event.pos[0]<593:
                    minu=0
                    sec=0
                elif event.pos[1] > 667 and event.pos[1] < 692:#on clique sur boutons bas
                    if event.pos[0] > 12 and event.pos[0] < 64:
                        if boutonba == 1:#build
                            boutonba=0
                        else:
                            boutonba=1
                    elif event.pos[0] > 74 and event.pos[0] < 126:#lvl up
                        if boutonba == 2:
                            boutonba=0
                        else:
                            boutonba=2
                    elif event.pos[0] > 136 and event.pos[0] < 188:#repair
                        if boutonba == 3:
                            boutonba=0
                        else:
                            boutonba=3
                    elif event.pos[0] > 243 and event.pos[0] < 295:#build
                        if boutonba == 4:
                            boutonba=0
                        else:
                            boutonba=4
                    elif event.pos[0] > 305 and event.pos[0] < 357:#lvl up
                        if boutonba == 5:
                            boutonba=0
                        else:
                            boutonba=5
                    elif event.pos[0] > 443 and event.pos[0] < 495:#build
                        if boutonba == 6:
                            boutonba=0
                        else:
                            boutonba=6
                    elif event.pos[0] > 505 and event.pos[0] < 557:#lvl up
                        if boutonba == 7:
                            boutonba=0
                        else:
                            boutonba=7
                    elif event.pos[0] > 643 and event.pos[0] < 695:#build
                        if boutonba == 8:
                            boutonba=0
                        else:
                            boutonba=8
                    elif event.pos[0] > 705 and event.pos[0] < 757:#lvl up
                        if boutonba == 9:
                            boutonba=0
                        else:
                            boutonba=9
                elif event.pos[1] > 625 and event.pos[1] < 652:#on clique sur le bouton haut
                    if event.pos[0]>12 and event.pos[0]<64:#on clique sur bouton1
                        if boutonba == 1:# build
                            if joueur == 1 and player1save["Gold"] > 999 and player1save["Muraille1"]==False:
                                player1save["Muraille1"] = True
                                player1save["PVMuraille1"] = 1000
                                player1save["Gold"] -= 1000
                            elif joueur==2 and player2save["Gold"] > 999 and player2save["Muraille1"]==False:
                                player2save["Muraille1"] = True
                                player2save["PVMuraille1"] = 1000
                                player2save["Gold"] -= 1000
                        elif boutonba == 3:# repair
                            if joueur == 1 and player1save["Muraille1"]==True:
                                if player1save["LVLMuraille1"] == 1 and player1save["Gold"]>749 and player1save["PVMuraille1"]<1000:
                                    player1save["PVMuraille1"] = 1000
                                    player1save["Gold"]-=750
                                elif player1save["LVLMuraille1"] == 2 and player1save["Gold"]>999 and player1save["PVMuraille1"]<2000:
                                    player1save["PVMuraille1"]=2000
                                    player1save["Gold"] -= 1000
                            elif joueur == 2 and player2save["Muraille1"]==True:
                                if player2save["LVLMuraille1"] == 1 and player2save["Gold"]>749 and player2save["PVMuraille1"]<1000:
                                    player2save["PVMuraille1"] = 1000
                                    player2save["Gold"]-=750
                                elif player2save["LVLMuraille1"] == 2 and player2save["Gold"]>999 and player1save["PVMuraille1"]<2000:
                                    player2save["PVMuraille1"] = 2000
                                    player2save["Gold"] -= 1000
                        elif boutonba == 2:# lvl up
                            if joueur == 1 and player1save["Gold"] > 1449 and player1save["Muraille1"]==True and player1save["LVLMuraille1"]==1:
                                player1save["LVLMuraille1"]=2
                                player1save["PVMuraille1"]=2000
                                player1save["Gold"] -= 1500
                            elif joueur == 2 and player2save["Gold"] > 1449 and player2save["Muraille1"]==True and player2save["LVLMuraille1"]==1:
                                player2save["LVLMuraille1"] = 2
                                player2save["PVMuraille1"]=2000
                                player2save["Gold"] -= 1500
                    elif event.pos[0]>74 and event.pos[0]<126:#on clique sur le bouton2
                        if boutonba == 1:
                            if joueur == 1 and player1save["Gold"] > 999 and player1save["Muraille2"]==False:
                                player1save["Muraille2"] = True
                                player1save["PVMuraille2"] = 1000
                                player1save["Gold"] -= 1000
                            elif joueur==2 and player2save["Gold"] > 999 and player2save["Muraille2"]==False:
                                player2save["Muraille2"] = True
                                player2save["PVMuraille2"] = 1000
                                player2save["Gold"] -= 1000
                        elif boutonba == 3:
                            if joueur == 1 and player1save["Muraille2"]==True:
                                if player1save["LVLMuraille2"] == 1 and player1save["Gold"]>749 and player1save["PVMuraille2"]<1000:
                                    player1save["PVMuraille2"] = 1000
                                    player1save["Gold"]-=750
                                elif player1save["LVLMuraille2"] == 2 and player1save["Gold"]>999 and player1save["PVMuraille2"]<2000:
                                    player1save["PVMuraille2"]=2000
                                    player1save["Gold"] -= 1000
                            elif joueur == 2 and player2save["Muraille2"]==True:
                                if player2save["LVLMuraille2"] == 1 and player2save["Gold"]>749 and player2save["PVMuraille2"]<1000:
                                    player2save["PVMuraille2"] = 1000
                                    player2save["Gold"]-=750
                                elif player2save["LVLMuraille2"] == 2 and player2save["Gold"]>999 and player2save["PVMuraille2"]<2000:
                                    player2save["PVMuraille2"] = 2000
                                    player2save["Gold"] -= 1000
                        elif boutonba == 2:
                            if joueur == 1 and player1save["Gold"] > 1449 and player1save["Muraille2"]==True and player1save["LVLMuraille2"]==1:
                                player1save["LVLMuraille2"]=2
                                player1save["PVMuraille2"]=2000
                                player1save["Gold"] -= 1500
                            elif joueur == 2 and player2save["Gold"] > 1449 and player2save["Muraille2"]==True and player2save["LVLMuraille2"]==1:
                                player2save["LVLMuraille2"] = 2
                                player2save["PVMuraille2"]=2000
                                player2save["Gold"] -= 1500
                    elif event.pos[0]>136 and event.pos[0]<188:#on clique sur le bouton3
                        if boutonba == 1:
                            if joueur == 1 and player1save["Gold"] > 999 and player1save["Muraille3"]==False:
                                player1save["Muraille3"] = True
                                player1save["PVMuraille3"] = 1000
                                player1save["Gold"] -= 1000
                            elif joueur==2 and player2save["Gold"] > 999 and player2save["Muraille3"]==False:
                                player2save["Muraille3"] = True
                                player2save["PVMuraille3"] = 1000
                                player2save["Gold"] -= 1000
                        elif boutonba == 3:
                            if joueur == 1 and player1save["Muraille3"]==True:
                                if player1save["LVLMuraille3"] == 1 and player1save["Gold"]>749 and player1save["PVMuraille3"]<1000:
                                    player1save["PVMuraille3"] = 1000
                                    player1save["Gold"]-=750
                                elif player1save["LVLMuraille3"] == 2 and player1save["Gold"]>999 and player1save["PVMuraille3"]<2000:
                                    player1save["PVMuraille3"]=2000
                                    player1save["Gold"] -= 1000
                            elif joueur == 2 and player2save["Muraille3"]==True:
                                if player2save["LVLMuraille3"] == 1 and player2save["Gold"]>749 and player2save["PVMuraille3"]<1000:
                                    player2save["PVMuraille3"] = 1000
                                    player2save["Gold"]-=750
                                elif player2save["LVLMuraille3"] == 2 and player2save["Gold"]>999 and player2save["PVMuraille3"]<2000:
                                    player2save["PVMuraille3"] = 2000
                                    player2save["Gold"] -= 1000
                        elif boutonba == 2:
                            if joueur == 1 and player1save["Gold"] > 1449 and player1save["Muraille3"]==True and player1save["LVLMuraille3"]==1:
                                player1save["LVLMuraille3"]=2
                                player1save["PVMuraille3"]=2000
                                player1save["Gold"] -= 1500
                            elif joueur == 2 and player2save["Gold"] > 1449 and player2save["Muraille3"]==True and player2save["LVLMuraille3"]==1:
                                player2save["LVLMuraille3"] = 2
                                player2save["PVMuraille3"]=2000
                                player2save["Gold"] -= 1500
                    elif event.pos[0]>212 and event.pos[0]<264:#on clique sur le bouton 1 tour 1
                        if boutonba == 4:
                            if joueur == 1 and player1save["Gold"] > 249 and player1save["Muraille1"]==True and player1save["Tour1Muraille1"]!=1:
                                player1save["Tour1Muraille1"]=1
                                player1save["lvlTourMuraille1"]=1
                                player1save["Gold"] -= 250
                            elif joueur==2 and player2save["Gold"] > 249 and player2save["Muraille1"]==True and player2save["Tour1Muraille1"]!=1:
                                player2save["Tour1Muraille1"]=1
                                player2save["lvlTourMuraille1"]=1
                                player2save["Gold"] -= 250
                        elif boutonba == 5:
                            if joueur == 1 and player1save["Gold"] > 499 and player1save["Tour1Muraille1"]==1 and player1save["lvlTourMuraille1"]==1:
                                player1save["lvlTourMuraille1"]=2
                                player1save["Gold"] -= 500
                            elif joueur == 2 and player2save["Gold"] > 499 and player2save["Tour1Muraille1"]==1 and player2save["lvlTourMuraille1"]==1:
                                player2save["lvlTourMuraille1"]=2
                                player2save["Gold"] -= 500
                    elif event.pos[0]>274 and event.pos[0]<326:#bouton2tour1
                        if boutonba == 4:
                            if joueur == 1 and player1save["Gold"] > 249 and player1save["Muraille2"]==True and player1save["Tour1Muraille2"]!=1:
                                player1save["Tour1Muraille2"]=1
                                player1save["lvlTourMuraille2"]=1
                                player1save["Gold"] -= 250
                            elif joueur==2 and player2save["Gold"] > 249 and player2save["Muraille2"]==True and player2save["Tour1Muraille2"]!=1:
                                player2save["Tour1Muraille2"]=1
                                player2save["lvlTourMuraille2"]=1
                                player2save["Gold"] -= 250
                        elif boutonba == 5:
                            if joueur == 1 and player1save["Gold"] > 499 and player1save["Tour1Muraille2"]==1 and player1save["lvlTourMuraille2"]==1:
                                player1save["lvlTourMuraille2"]=2
                                player1save["Gold"] -= 500
                            elif joueur == 2 and player2save["Gold"] > 499 and player2save["Tour1Muraille2"]==1 and player2save["lvlTourMuraille2"]==1:
                                player2save["lvlTourMuraille2"]=2
                                player2save["Gold"] -= 500
                    elif event.pos[0]>338 and event.pos[0]<390:#bouton3tour1
                        if boutonba == 4:
                            if joueur == 1 and player1save["Gold"] > 249 and player1save["Muraille3"]==True and player1save["Tour1Muraille3"]!=1:
                                player1save["Tour1Muraille3"]=1
                                player1save["lvlTourMuraille3"]=1
                                player1save["Gold"] -= 250
                            elif joueur==2 and player2save["Gold"] > 249 and player2save["Muraille3"]==True and player1save["Tour1Muraille3"]!=1:
                                player2save["Tour1Muraille3"]=1
                                player2save["lvlTourMuraille3"]=1
                                player2save["Gold"] -= 250
                        elif boutonba == 5:
                            if joueur == 1 and player1save["Gold"] > 499 and player1save["Tour1Muraille3"]==1 and player1save["lvlTourMuraille3"]==1:
                                player1save["lvlTourMuraille3"]=2
                                player1save["Gold"] -= 500
                            elif joueur == 2 and player2save["Gold"] > 499 and player2save["Tour1Muraille3"]==1 and player2save["lvlTourMuraille3"]==1:
                                player2save["lvlTourMuraille3"]=2
                                player2save["Gold"] -= 500
                    elif event.pos[0]>412 and event.pos[0]<464:#bouton1tour2
                        if boutonba == 6:
                            if joueur == 1 and player1save["Gold"] > 749 and player1save["Muraille1"]==True and player1save["Tour1Muraille1"]!=2:
                                player1save["Tour1Muraille1"]=2
                                player1save["lvlTourMuraille1"]=1
                                player1save["Gold"] -= 750
                            elif joueur==2 and player2save["Gold"] > 749 and player2save["Muraille1"]==True and player2save["Tour1Muraille1"]!=2:
                                player2save["Tour1Muraille1"]=2
                                player2save["lvlTourMuraille1"]=1
                                player2save["Gold"] -= 750
                        elif boutonba == 7:
                            if joueur == 1 and player1save["Gold"] > 999 and player1save["Tour1Muraille1"]==2 and player1save["LVLMuraille1"]==1:
                                player1save["lvlTourMuraille1"]=2
                                player1save["Gold"] -= 1000
                            elif joueur == 2 and player2save["Gold"] > 999 and player2save["Tour1Muraille1"]==2 and player2save["LVLMuraille1"]==1:
                                player2save["lvlTourMuraille1"]=2
                                player2save["Gold"] -= 1000
                    elif event.pos[0]>474 and event.pos[0]<526:#bouton2tour2
                        if boutonba == 6:
                            if joueur == 1 and player1save["Gold"] > 499 and player1save["Muraille2"]==True and player1save["Tour1Muraille2"]!=2:
                                player1save["Tour1Muraille2"]=2
                                player1save["lvlTourMuraille2"]=1
                                player1save["Gold"] -= 500
                            elif joueur==2 and player2save["Gold"] > 499 and player2save["Muraille2"]==True and player2save["Tour1Muraille2"]!=2:
                                player2save["Tour1Muraille2"]=2
                                player2save["lvlTourMuraille2"]=1
                                player2save["Gold"] -= 500
                        elif boutonba == 7:
                            if joueur == 1 and player1save["Gold"] > 999 and player1save["Tour1Muraille2"]==2 and player1save["LVLMuraille2"]==1:
                                player1save["lvlTourMuraille2"]=2
                                player1save["Gold"] -= 1000
                            elif joueur == 2 and player2save["Gold"] > 999 and player2save["Tour1Muraille2"]==2 and player2save["lvlTourMuraille2"]==1:
                                player2save["lvlTourMuraille2"]=2
                                player2save["Gold"] -= 1000
                    elif event.pos[0]>536 and event.pos[0]<588:#bouton3tour2
                        if boutonba == 6:
                            if joueur == 1 and player1save["Gold"] > 499 and player1save["Muraille3"]==True and player1save["Tour1Muraille3"]!=2:
                                player1save["Tour1Muraille3"]=2
                                player1save["lvlTourMuraille3"]=1
                                player1save["Gold"] -= 500
                            elif joueur==2 and player2save["Gold"] > 499 and player2save["Muraille3"]==True and player2save["Tour1Muraille3"]!=2:
                                player2save["Tour1Muraille3"]=2
                                player2save["lvlTourMuraille3"]=1
                                player2save["Gold"] -= 500
                        elif boutonba == 7:
                            if joueur == 1 and player1save["Gold"] > 999 and player1save["Tour1Muraille3"]==2 and player1save["lvlTourMuraille3"]==1:
                                player1save["lvlTourMuraille3"]=2
                                player1save["Gold"] -= 1000
                            elif joueur == 2 and player2save["Gold"] > 999 and player2save["Tour1Muraille3"]==2 and player2save["lvlTourMuraille3"]==1:
                                player2save["lvlTourMuraille3"]=2
                                player2save["Gold"] -= 1000
                    elif event.pos[0]>612 and event.pos[0]<664:#bouton1tour3
                        if boutonba == 8:
                            if joueur == 1 and player1save["Gold"] > 1249 and player1save["Muraille1"]==True and player1save["Tour1Muraille1"]!=3:
                                player1save["Tour1Muraille1"]=3
                                player1save["lvlTourMuraille1"]=1
                                player1save["Gold"] -= 1250
                            elif joueur==2 and player2save["Gold"] > 1249 and player2save["Muraille1"]==True and player2save["Tour1Muraille1"]!=3:
                                player2save["Tour1Muraille1"]=3
                                player2save["lvlTourMuraille1"]=1
                                player2save["Gold"] -= 1250
                        elif boutonba == 9:
                            if joueur == 1 and player1save["Gold"] > 1499 and player1save["Tour1Muraille1"]==3 and player1save["lvlTourMuraille1"]==1:
                                player1save["lvlTourMuraille1"]=2
                                player1save["Gold"] -= 1500
                            elif joueur == 2 and player2save["Gold"] > 1499 and player2save["Tour1Muraille1"]==3 and player2save["lvlTourMuraille1"]==1:
                                player2save["lvlTourMuraille1"]=2
                                player2save["Gold"] -= 1500
                    elif event.pos[0]>674 and event.pos[0]<726:#bouton2tour3
                        if boutonba == 8:
                            if joueur == 1 and player1save["Gold"] > 999 and player1save["Muraille2"]==True and player1save["Tour1Muraille2"]!=3:
                                player1save["Tour1Muraille2"]=3
                                player1save["lvlTourMuraille2"]=1
                                player1save["Gold"] -= 1000
                            elif joueur==2 and player2save["Gold"] > 999 and player2save["Muraille2"]==True and player2save["Tour1Muraille2"]!=3:
                                player2save["Tour1Muraille2"]=3
                                player2save["lvlTourMuraille2"]=1
                                player2save["Gold"] -= 1000
                        elif boutonba == 9:
                            if joueur == 1 and player1save["Gold"] > 1499 and player1save["Tour1Muraille2"]==3 and player1save["lvlTourMuraille2"]==1:
                                player1save["lvlTourMuraille2"]=2
                                player1save["Gold"] -= 1500
                            elif joueur == 2 and player2save["Gold"] > 1499 and player2save["Tour1Muraille2"]==3 and player2save["lvlTourMuraille2"]==1:
                                player2save["lvlTourMuraille2"]=2
                                player2save["Gold"] -= 1500
                    elif event.pos[0]>736 and event.pos[0]<788:#bouton3tour3
                        if boutonba == 8:
                            if joueur == 1 and player1save["Gold"] > 999 and player1save["Muraille3"]==True and player1save["Tour1Muraille3"]!=3:
                                player1save["Tour1Muraille3"]=3
                                player1save["lvlTourMuraille3"]=1
                                player1save["Gold"] -= 1000
                            elif joueur==2 and player2save["Gold"] > 999 and player2save["Muraille3"]==True and player2save["Tour1Muraille3"]!=3:
                                player2save["Tour1Muraille3"]=3
                                player1save["lvlTourMuraille3"]=1
                                player2save["Gold"] -= 1000
                        elif boutonba == 9:
                            if joueur == 1 and player1save["Gold"] > 1499 and player1save["Tour1Muraille3"]==3 and player1save["lvlTourMuraille3"]==1:
                                player1save["lvlTourMuraille3"]=2
                                player1save["Gold"] -= 1500
                            elif joueur == 2 and player2save["Gold"] > 1499 and player2save["Tour1Muraille3"]==3 and player2save["lvlTourMuraille3"]==1:
                                player2save["lvlTourMuraille3"]=2
                                player2save["Gold"] -= 1500

class Error(Exception):
    pass

class InitializationError(Error):
    def __init__(self,message):
        sel.message = message

class ShapeError(Error):
    def __init__(self,message):
        self.message = message

class tools:
    @staticmethod
    def enter(value,minLevel,maxLevel):
        try:
            if value >= minLevel and value <= maxLevel:
                return True
            else:
                return False
        except:
            raise ValueError("arguments are not a numbers")

    @staticmethod
    def multiEqual(value,list):
        try:
            result = False
            for number in list:
                if value == number:
                    result = True
            return result
        except:
            raise ValueError("arguments are not good, fonction get a number and a tuple full of number")

    @staticmethod
    def dymEqual(list):
        try:
            result = []
            for pos in range(0,len(list)):
                if eval(list[pos]):
                    result.append(pos)
            return result
        except:
            raise ValueError("argument has error in condition")

class HealthBar():
    def __init__(self):
        self._init = False

    def isInit(self):
        if not self._init:
            raise initializationError("HealthBar is not initialized")

    def setScreen(self,value):
        self.isInit()
        if type(value) == pygame.Surface:
            self._screen = value
        else:
            raise TypeError("argument is not a pygame surface object")

    def getScreen(self):
        self.isInit()
        return self._screen


    def setBackgroundColor(self,value):
        self.isInit()
        if (type(value) == tuple or type(value) == list) and len(value) == 3:
            self._backgroundColor = value
        else:
            raise ValueError("argument is not a tuple or list or it has not three numbers")

    def getBackgroundColor(self):
        self.isInit()
        return self._backgroundColor

    def setBarColor(self,value):
        self.isInit()
        if (type(value) == tuple or type(value) == list) and len(value) == 3:
            self._barColor = value
        else:
            raise ValueError("argument is not a tuple or list or it has not three numbers")

    def getBarColor(self):
        self.isInit()
        return self._barColor

    def getDim(self):
        self.isInit()
        return self._dim

    def getAlpha(self):
        self.isInit()
        return self._alpha

    def getBorder(self):
        self.isInit()
        return self._border

    def _creatCalque(self):
        self.isInit()
        self._calque = pygame.Surface(self.getDim(),pygame.SRCALPHA)
        self._calque.set_alpha(self.getAlpha())
        self._calque.fill(self.getBackgroundColor())

        dim = self.getDim()
        bor = self.getBorder()
        self._dimIn = (dim[0]-bor*2,dim[1]-bor*2)

    def setMaxLife(self,value):
        self.isInit()
        if type(value) == int and value > 0:
            self._maxLife = value
        else:
            raise ValueError("argument is not a int number or it is not positive")

    def getMaxLife(self):
        self.isInit()
        return self._maxLife

    def setLife(self,value):
        self.isInit()
        if type(value) == int and value >= 0:
            self._life = value
        else:
            raise ValueError("argument is not a int number or it is not positive")

    def getLife(self):
        self.isInit()
        return self._life

    def init(self, screen,dim,maxLife,life,border=2,alpha=255,backgroundColor=(0,0,0),barColor=(0,255,0)):
        self._init = True
        self.setScreen(screen)
        self.setMaxLife(maxLife)
        self.setLife(life)
        if (type(dim) == list or type(dim) == tuple) and len(dim) == 2:
            self._dim = dim
        else:
            raise ValueError("argument is not a tuple or list or it has not two numbers")
        if type(border) == int and border > 0:
            self._border = border
        else:
            raise ValueError("argument is not a number or is nagative")
        if type(alpha) == int and tools.enter(alpha,0,255):
            self._alpha = alpha
        self.setBackgroundColor(backgroundColor)
        self.setBarColor(barColor)
        self._creatCalque()

    def _updateCalque(self):
        self.isInit()
        length = int((self._dimIn[0]*self.getLife())/self.getMaxLife())
        self._calque.fill(self.getBackgroundColor())
        rect = (self.getBorder(),self.getBorder(),length,self._dimIn[1])
        pygame.draw.rect(self._calque,self.getBarColor(),rect)

    def show(self,pos):
        self.isInit()
        if (type(pos) == tuple or type(pos) == list) and len(pos) == 2:
            self._updateCalque()
            self.getScreen().blit(self._calque,pos)
        else:
            raise ValueError("argument is not a tuple or list or it has not two numbers")

class Entity:
    def __init__(self):
        self._pos = [0,0]
        self._healthBar = False
        self._death = False

    def show(self):
        if not self.getDeath():
            self._screen.blit(self._calque, self._pos)

    def setPos(self,value):
        if (type(value) == tuple or type(value) == list) and len(value) == 2:
            self._pos = value
        else:
            raise ValueError("argument is not a tuple or list or it have not two number")

    def getPos(self):
        return self._pos

    def setScreen(self,value):
        if type(value) == pygame.Surface:
            self._screen = value
        else:
            raise TypeError("argument is not a pygame surface object")

    def getScreen(self):
        return self._screen

    def addHealthBar(self):
        self._healthBar = True
        self.healthBar = HealthBar()

    def getDeath(self):
        return self._death

    def setDeath(self,value):
        if type(value) == bool:
            self._death = value
        else:
            raise ValueError("argument is not a boolean")

    def setCalque(self,value):
        if type(value) == pygame.Surface:
            self._calque = value
        else:
            raise ValueError("argument is not pygame surface object")

    def getCalque(self):
        return self._calque

    def setInitCalque(self,value):
        if type(value) == pygame.Surface:
            self._initCalque = value
            self.setCalque(value)
        else:
            raise ValueError("argument is not a pygame surface object")

    def getInitCalque(self):
        return self._initCalque

class Soldat(Entity):
    def __init__(self):
        Entity.__init__(self)
        self.setPos((800,295))
        self._path = 0
        self._life = 0
        self._maxLife = 0
        self._speed = 0
        self._cible = 0
        self._mapInst = None
        self._degat = 0
        self._reloading = 0
        self._cost = 0

    def setCost(self,value):
        if type(value) == int and value > 0:
            self._cost = value
        else:
            raise TypeError("argument is not integer number or it is negative")

    def getCost(self):
        return self._cost

    def setMapInstance(self,instance):
        self._mapInst = instance

    def getMapInstance(self):
        return self._mapInst

    def setReloading(self,value):
        if type(value) == int and value >= 0:
            self._reloading = value
        else:
            raise ValueError("argument is not integer number or it is negative")

    def getReloading(self):
        return self._reloading

    def setMaxLife(self,value):
        if type(value) == int and value > 0:
            self._maxLife = value
        else:
            raise ValueError("argument is not an integer number or it is negative")

    def getMaxLife(self):
        return self._maxLife

    def setLife(self,value):
        if type(value) == int:
            if value > self.getMaxLife():
                self._life = self.getMaxLife()
            elif value < 0:
                self._life = 0
                self.setDeath(True)
            else:
                self._life = value
        else:
            raise ValueError("argument is not an integer number or it is negative")

    def getLife(self):
        return self._life

    def getPath(self):
        return self._path

    def setPath(self,value):
        if type(value) == int and tools.enter(value,0,6):
            self._path = value
        else:
            raise ValueError("argument is not an integer number or is not in [0:6]")

    def setSpeed(self,value):
        if type(value) == int and value > 0:
            self._speed = value
        else:
            raise ValueError("ergument is not an integer number or it is negative or null")

    def getSpeed(self):
        return self._speed

    def setCible(self,value):
        if type(value) == int and tools.enter(value,0,3):
            self._cible = value
        else:
            raise ValueError("argument is not an integer number or it is not in [0:3]")

    def getCible(self):
        return self._cible

    def getDegat(self):
        return self._degat

    def setDegat(self,value):
        if type(value) == int and value > 0:
            self._degat = value
        else:
            raise ValueError("ergument ist not an integer number or it is negative")

    def degat(self,value):
        if type(value) == int:
            self.setLife(self.getLife() - value)

    def attack(self):
        cible = self.getCible()
        map = self.getMapInstance()
        reloading = self.getReloading()
        if reloading == 0:
            if cible != 0:
                if cible == 1:
                    inst = map.getInstance("M",1)
                elif cible == 2:
                    inst = map.getInstance("M",2)
                elif cible == 3:
                    inst = map.getInstance("M",3)
                else:
                    raise ValueError("cible is not in [0:3]")
                self.setReloading(5)
                inst.degat(self.getDegat())
        else:
            self.setReloading(reloading - 1)

    def _simpleMouvement(self):
        path = self.getPath()
        speed = self.getSpeed()
        pos = self.getPos()
        map = self.getMapInstance()
        x = 0
        y = 0
        if tools.multiEqual(path,(0,2,4,6)):
            x = -speed
        elif tools.multiEqual(path,(1,5)):
            y = speed
        elif path == 3:
            y = -speed
        else:
            raise ValueError("path is not in [0:6]")
        pos = (pos[0]+x,pos[1]+y)
        self._ciblage(pos)

    def _ciblage(self,pos):
        pos = list(pos)
        path = self.getPath()
        map = self.getMapInstance()
        if tools.multiEqual(path,(2,4,6)):
            num = (685,515,340)
            if path == 2:
                inst = map.getInstance("M",3)
                cible = 3
            elif path == 4:
                inst = map.getInstance("M",2)
                cible = 2
            elif path == 6:
                inst = map.getInstance("M",1)
                cible = 1
            if not inst.getDeath() and pos[0] < num[int(path/2-1)]:
                pos[0] = num[int(path/2-1)]
                self.setCible(cible)
            else:
                self.setCible(0)
        self.setPos(pos)

    def _rotateMouvement(self):
        path = self.getPath()
        pos = self.getPos()
        map = self.getMapInstance()
        work = ("pos[0]<","pos[1]>","pos[0]<","pos[1]<","pos[0]<","pos[1]>","pos[0]<")
        num = ("724","458","560","159","392","324","180")
        if eval(work[path]+num[path]):
            if path == 6:
                map.victory()
            else:
                self.setPath(path+1)
                if tools.multiEqual(path+1,(2,4,6)):
                    self.rotate(180)
                    self.setPos((pos[0],int(num[path])))
                elif tools.multiEqual(path+1,(1,3,5)):
                    if path+1 == 3:
                        self.rotate(90)
                    else:
                        self.rotate(270)
                    self.setPos((int(num[path]),pos[1]))

    def mouve(self):
        path = self.getPath()
        self._simpleMouvement()
        self._rotateMouvement()

    def showLife(self):
        self.healthBar.setLife(self.getLife())
        pos = self.getPos()
        self.healthBar.show((pos[0]-5,pos[1]-10))


    def rotate(self,value):
        if type(value) == int and tools.multiEqual(value,(0,90,180,270)):
            calque = self.getInitCalque()
            calque = pygame.transform.rotate(calque,value)
            self.setCalque(calque)
        else:
            raise ValueError("argument is not a integer number or it is not 0,90,180 or 270")

    def show(self):
        self.showLife()
        self.getScreen().blit(self.getCalque(),self.getPos())

class Barbare(Soldat):
    def __init__(self):
        Soldat.__init__(self)

    def setValue(self,screen,map):
        maxLife = 175
        life = 175
        self.setScreen(screen)
        self.setInitCalque(texture["Barbare"])
        self.addHealthBar()
        self.healthBar.init(self.getScreen(),(20,5),maxLife,life,1)
        self.setMapInstance(map)
        self.setMaxLife(maxLife)
        self.setLife(life)
        self.setSpeed(2)
        self.setDegat(13)
        self.setCost(200)
        self.rotate(180)

    def levelUp(self):
        maxLife = 250
        life = 250
        self.healthBar.setMaxLife(maxLife)
        self.healthBar.setLife(life)
        self.setMaxLife(maxLife)
        self.setLife(life)
        self.setSpeed(2)
        self.setDegat(17)
        self.setCost(250)
        self.rotate(180)

class Golem(Soldat):
    def __init__(self):
        Soldat.__init__(self)

    def setValue(self,screen,map):
        maxLife = 600
        life = 600
        self.setScreen(screen)
        self.setInitCalque(texture["Géant"])
        self.addHealthBar()
        self.healthBar.init(self.getScreen(),(20,5),maxLife,life,1)
        self.setMapInstance(map)
        self.setMaxLife(maxLife)
        self.setLife(life)
        self.setSpeed(1)
        self.setDegat(11)
        self.setCost(300)
        self.rotate(180)

    def levelUp(self):
        maxLife = 750
        life = 750
        self.healthBar.setMaxLife(maxLife)
        self.healthBar.setLife(life)
        self.setMaxLife(maxLife)
        self.setLife(life)
        self.setSpeed(1)
        self.setDegat(15)
        self.setCost(400)
        self.rotate(180)

class Militaire(Soldat):
    def __init__(self):
        Soldat.__init__(self)

    def setValue(self,screen,map):
        maxLife = 300
        life = 300
        self.setScreen(screen)
        self.setInitCalque(texture["Militaire"])
        self.addHealthBar()
        self.healthBar.init(self.getScreen(),(20,5),maxLife,life,1)
        self.setMapInstance(map)
        self.setMaxLife(maxLife)
        self.setLife(life)
        self.setSpeed(3)
        self.setDegat(20)
        self.setCost(500)
        self.rotate(180)

    def levelUp(self):
        maxLife = 400
        life = 400
        self.healthBar.setMaxLife(maxLife)
        self.healthBar.setLife(life)
        self.setMaxLife(maxLife)
        self.setLife(life)
        self.setSpeed(3)
        self.setDegat(30)
        self.setCost(650)
        self.rotate(180)

class Tower(Entity):
    def __init__(self):
        Entity.__init__(self)
        self._centredPos = (0,0)
        self._degat = 0
        self._speed = 0
        self._reloading = 0
        self._cible = []
        self._range = 0
        self._type = None
        self._map = None
        self._zoneRange = 0
        self._calqueZone = None
        self.overfly = False

    def setZoneRange(self,value):
        if type(value) == int and value > 0:
            self._zoneRange = value
        else:
            raise ValueError("argument is not integer nuymber or it is negative")

    def getZoneRange(self):
        return self._zoneRange

    def setMapInstance(self,instance):
        self._map = instance

    def getMapInstance(self):
        return self._map

    def setCentredPos(self,value):
        if (type(value) == list or type(value) == tuple) and len(value) == 2:
            self._centredPos = value
        else:
            raise ValueError("argument is not tuple or list or it has not two number")

    def getCentredPos(self):
        return self._centredPos

    def setDegat(self,value):
        if type(value) == int and value > 0:
            self._degat = value
        else:
            raise ValueError("argument is not integer number or it is negative")

    def getDegat(self):
        return self._degat

    def setSpeed(self,value):
        if type(value) == int and value > 0:
            self._speed = value
        else:
            raise ValueError("argument is not integer number or it is negative")

    def getSpeed(self):
        return self._speed

    def setReloading(self,value):
        if type(value) == int and value >= 0:
            self._reloading = value
        else:
            raise ValueError("argument is not integer number or it is negative")

    def getReloading(self):
        return self._reloading

    def setCible(self,value):
        if type(value) == list or type(value) == tuple:
            self._cible = list(value)
        else:
            raise ValueError("argument is not a list or tuple")

    def getCible(self):
        return self._cible

    def addCible(self,value):
        if type(value) == Barbare or type(value) == Golem or type(value) == Militaire:
            self._cible.append(value)
        else:
            raise ValueError("argument is not a soldat object")

    def setRange(self,value):
        if type(value) == int and value > 0:
            self._range = value
        else:
            raise ValueError("argument is not integer number or it is negative")

    def getRange(self):
        return self._range

    def setType(self,value):
        if type(value) == str and tools.multiEqual(value,("simple","zone")):
            if value == "simple":
                self._type = self._attackTypeSimple
            else:
                self._type = self._attackTypeZone
        else:
            raise ValueError("argument is not string or it is not 'simple' or 'zone'")

    def getType(self):
        return self._type.__name__

    def _radiusCalcul(self,pos1,pos2):
        x = abs(pos1[0] - pos2[0])
        y = abs(pos1[1] - pos2[1])
        radius = int(math.sqrt(x**2+y**2))
        return radius

    def _select(self,list):
        distance = []
        object = []
        for data in list:
            distance.append(data[0])
            object.append(data[1])
        result = []
        for nbr in range(0,len(distance)):
            value  = min(i for i in distance)
            result.append((value,object[distance.index(value)]))
            del distance[distance.index(value)]
        return result

    def _soldatInRange(self,range,pos):
        map = self.getMapInstance()
        soldatList = map.getSoldat()
        result = []
        for instance in soldatList:
            radius = self._radiusCalcul(pos,instance.getPos())
            if radius <= range:
                result.append((radius,instance))
        return result

    def _attackTypeSimple(self):
        inRangeList = self._soldatInRange(self.getRange(),self.getCentredPos())
        selectList = self._select(inRangeList)
        self.setCible([])
        if len(selectList) > 0:
            self.addCible(selectList[0] [1])

    def _attackTypeZone(self):
        inRangeList = self._soldatInRange(self.getRange(),self.getCentredPos())
        selectList = self._select(inRangeList)
        self.setCible([])
        if len(selectList) > 0:
            inRangeZoneList = self._soldatInRange(self.getZoneRange(),selectList[0] [1].getPos())
            for data in inRangeZoneList:
                self.addCible(data[1])

    def attack(self):
        reloading = self.getReloading()
        if reloading == 0:
            self._type()
            listCible = self.getCible()
            for inst in listCible:
                inst.degat(self.getDegat())
            self.setCible(())
            self.setReloading(self.getSpeed())
        else:
            self.setReloading(reloading - 1)

    def initShowZone(self):
        radius = self.getRange()
        calque = pygame.Surface((radius*2,radius*2),pygame.SRCALPHA)
        pygame.draw.circle(calque,(255,0,0),(radius,radius),radius,2)
        self._calqueZone = calque

    def getShowZone(self):
        return self._calqueZone

    def showZone(self):
        posC = self.getCentredPos()
        radius = self.getRange()
        pos = (posC[0]-radius,posC[1]-radius)
        self.getScreen().blit(self.getShowZone(),pos)

    def isIn(self,pos):
        myPos = self.getPos()
        myPosCentred = self.getCentredPos()
        x = myPos[0] + (myPosCentred[0] - myPos[0]) * 2
        y = myPos[1] + (myPosCentred[1] - myPos[1]) * 2
        if tools.enter(pos[0],myPos[0],x) and tools.enter(pos[1],myPos[1],y):
            return True
        else:
            return False

    def event(self,pos):
        if self.isIn(pos):
            self.overfly = True
        else:
            self.overfly = False

    def setInstanceParent(self,inst):
        self._instParent = inst

    def getInstanceParent(self):
        return self._instParent

    def show(self):
        self.setDeath(self.getInstanceParent().getDeath())
        self.getScreen().blit(self.getCalque(),self.getPos())
        if self.overfly:
            self.showZone()

class Alpha(Tower):
    def __init__(self):
        Tower.__init__(self)

    def setValue(self,screen,map,pos,inst):
        global texture
        self.setScreen(screen)
        self.setPos(pos)
        self.setInstanceParent(inst)
        centredPos = (pos[0]+25,pos[1]+25)
        self.setCentredPos(centredPos)
        self.setCalque(texture["TOUR1"])
        self.setDegat(15)
        self.setSpeed(5)
        self.setRange(150)
        self.setType("simple")
        self.setMapInstance(map)
        self.initShowZone()

    def levelUp(self):
        self.setDegat(18)
        self.setSpeed(5)
        self.setRange(150)
        self.setType("simple")
        self.initShowZone()

class Beta(Tower):
    def __init__(self):
        Tower.__init__(self)

    def setValue(self,screen,map,pos,inst):
        global texture
        self.setScreen(screen)
        self.setPos(pos)
        self.setInstanceParent(inst)
        centredPos = (pos[0]+25,pos[1]+25)
        self.setCentredPos(centredPos)
        self.setCalque(texture["TOUR2"])
        self.setDegat(20)
        self.setSpeed(6)
        self.setRange(175)
        self.setType("simple")
        self.setMapInstance(map)
        self.initShowZone()

    def levelUp(self):
        self.setDegat(25)
        self.setSpeed(6)
        self.setRange(175)
        self.setType("simple")
        self.initShowZone()

class Gamma(Tower):
    def __init__(self):
        Tower.__init__(self)

    def setValue(self,screen,map,pos,inst):
        global texture
        self.setScreen(screen)
        self.setPos(pos)
        self.setInstanceParent(inst)
        centredPos = (pos[0]+25,pos[1]+25)
        self.setCentredPos(centredPos)
        self.setCalque(texture["TOUR3"])
        self.setDegat(16)
        self.setSpeed(6)
        self.setRange(175)
        self.setType("zone")
        self.setZoneRange(10)
        self.setMapInstance(map)
        self.initShowZone()

    def levelUp(self):
        self.setDegat(20)
        self.setSpeed(6)
        self.setRange(175)
        self.setType("zone")
        self.setZoneRange(10)
        self.initShowZone()

class Wall(Entity):
    def __init__(self):
        Entity.__init__(self)
        self._life = 0
        self._maxLife = 0

    def degat(self,value):
        if type(value) == int:
            self.setLife(self.getLife() - value)

    def setValue(self,screen,pos):
        global texture
        self.setPos(pos)
        self.setScreen(screen)
        self.addHealthBar()
        self.setCalque(texture["Muraille"])
        maxLife = 1000
        life = 1000
        self.healthBar.init(screen,(50,10),maxLife,life)
        self.setMaxLife(maxLife)
        self.setLife(life)

    def levelUp(self):
        maxLife = 2000
        life = 2000
        self.healthBar.setMaxLife(maxLife)
        self.healthBar.setLife(life)
        self.setMaxLife(maxLife)
        self.setLife(life)

    def setMaxLife(self,value):
        if type(value) == int and value > 0:
            self._maxLife = value
        else:
            raise ValueError("argument is not an integer number or it is negative")

    def getMaxLife(self):
        return self._maxLife

    def setLife(self,value):
        if type(value) == int:
            if value > self.getMaxLife():
                self._life = self.getMaxLife()
            elif value < 0:
                self._life = 0
                self.setDeath(True)
            else:
                self._life = value
        else:
            raise ValueError("argument is not an integer number or it is negative")

    def getLife(self):
        return self._life

    def showLife(self):
        self.healthBar.setLife(self.getLife())
        pos = self.getPos()
        self.healthBar.show((pos[0],pos[1]-15))

    def show(self):
        if not self.getDeath():
            self.showLife()
            self.getScreen().blit(self.getCalque(),self.getPos())

class Button(Entity):
    def __init__(self):
        Entity.__init__(self)
        self._type = ""
        self._shape = False
        self._overfly = False
        self._size = (0,0)
        self._calqueOverfly = None
        self._calqueStandard = None

    def setMapInstance(self,instance):
        self._mapInst = instance

    def getMapInstance(self):
        return self._mapInst

    def setOverfly(self,value):
        if type(value) == bool:
            self._overfly = value
        else:
            raise ValueError("argument is not a boolean")

    def getOverfly(self):
        return self._overfly

    def setType(self,value):
        if type(value) == str and tools.multiEqual(value,("push","lever")):
            if value == "push":
                self._type = self._typePush
                self.show = self._showPush
            else:
                self._type = self._typeLever
                self.show = self._showLever
        else:
            raise ValueError("argument is not string or it is not 'push' or 'lever'")

    def getType(self):
        return self._type.__name__

    def getShape(self):
        if self.getType() == "_typeLever":
            return self._shape
        else:
            raise ShapeError("this button is in push mode")

    def setShape(self,value):
        if self.getType() == "_typeLever":
            if type(value) == bool:
                self._shape = value
            else:
                raise ValueError("argument is not a boolean")
        else:
            raise ShapeError("this button is in push mode")

    def setSize(self,value):
        if (type(value) == list or type(value) == tuple) and len(value) == 2:
            self._size = value
        else:
            raise ValueError("argument is not a list or tuple or it has not two number")

    def getSize(self):
        return self._size

    def isIn(self,pos):
        myPos = self.getPos()
        mySize = self.getSize()
        if tools.enter(pos[0],myPos[0],myPos[0]+mySize[0]) and tools.enter(pos[1],myPos[1],myPos[1]+mySize[1]):
            return True
        else:
            return False

    def event(self,pos,button):
        if self.isIn(pos):
            self._type(button)
        else:
            self.setOverfly(False)

    def _typePush(self,button):
        if button == 1:
            self.action()
        else:
            self.setOverfly(True)

    def _typeLever(self,button):
        if button == 1:
            if self.getShape():
                self.setShape(False)
            else:
                self.setShape(True)

    def setOverflyCalque(self,inst):
        if type(inst) == pygame.Surface:
            self._calqueOverfly = inst
        else:
            raise ValueError("argument is not pygame surface object")

    def getOverflyCalque(self):
        return self._calqueOverfly

    def setStandardCalque(self,inst):
        if type(inst) == pygame.Surface:
            self._calqueStandard = inst
        else:
            raise ValueError("argument is not pygame surface object")

    def getStandardCalque(self):
        return self._calqueStandard

    def _showPush(self):
        if self.getOverfly():
            self.getScreen().blit(self.getOverflyCalque(),self.getPos())
        else:
            self.getScreen().blit(self.getStandardCalque(),self.getPos())

    def _showLever(self):
        if self.getShape():
            self.getScreen().blit(self.getOverflyCalque(),self.getPos())
        else:
            self.getScreen().blit(self.getStandardCalque(),self.getPos())

class LevelUpButton(Button):
    def __init__(self):
        Button.__init__(self)

    def setValue(self,screen,pos):
        self.setScreen(screen)
        self.setType('lever')
        self.setShape(False)
        self.setSize((50,25))
        self.setPos(pos)
        self.setOverfly(False)
        self.setOverflyCalque(texture["boutonUPA"])
        self.setStandardCalque(texture["boutonUP"])

class BarbareButton(Button):
    def __init__(self):
        Button.__init__(self)

    def setValue(self,screen,map,pos):
        global texture
        self.setScreen(screen)
        self.setMapInstance(map)
        self.setType('push')
        self.setSize((60,60))
        self.setPos(pos)
        self.setOverfly(False)
        textureI = pygame.transform.scale2x(texture["Barbare"])
        textureI = pygame.transform.scale2x(textureI)
        textureI.set_colorkey((255,255,255))
        self.setOverflyCalque(textureI)
        self.setStandardCalque(textureI)

    def action(self):
        map = self.getMapInstance()
        screen = self.getScreen()
        inst = Barbare()
        inst.setValue(screen,map)
        if map.getInstance("B",4).getShape():
            inst.levelUp()
        if map.getGold() >= inst.getCost():
            map.addSoldat(inst)
            map.setGold(map.getGold()-inst.getCost())

class GolemButton(Button):
    def __init__(self):
        Button.__init__(self)

    def setValue(self,screen,map,pos):
        global texture
        self.setScreen(screen)
        self.setMapInstance(map)
        self.setType('push')
        self.setSize((40,40))
        self.setPos(pos)
        self.setOverfly(False)
        textureI = pygame.transform.scale2x(texture["Géant"])
        textureI.set_colorkey((255,255,255))
        self.setOverflyCalque(textureI)
        self.setStandardCalque(textureI)

    def action(self):
        map = self.getMapInstance()
        screen = self.getScreen()
        inst = Golem()
        inst.setValue(screen,map)
        if map.getInstance("B",5).getShape():
            inst.levelUp()
        if map.getGold() >= inst.getCost():
            map.addSoldat(inst)
            map.setGold(map.getGold()-inst.getCost())

class MilitaireButton(Button):
    def __init__(self):
        Button.__init__(self)

    def setValue(self,screen,map,pos):
        global texture
        self.setScreen(screen)
        self.setMapInstance(map)
        self.setType('push')
        self.setSize((40,40))
        self.setPos(pos)
        self.setOverfly(False)
        textureI = pygame.transform.scale2x(texture["Militaire"])
        textureI = pygame.transform.scale2x(textureI)
        textureI.set_colorkey((255,255,255))
        self.setOverflyCalque(textureI)
        self.setStandardCalque(textureI)

    def action(self):
        map = self.getMapInstance()
        screen = self.getScreen()
        inst = Militaire()
        inst.setValue(screen,map)
        if map.getInstance("B",6).getShape():
            inst.levelUp()
        if map.getGold() >= inst.getCost():
            map.addSoldat(inst)
            map.setGold(map.getGold()-inst.getCost())

class ArrowButton(Button):
    def __init__(self):
        Button.__init__(self)

    def setValue(self,screen,timer):
        self.setScreen(screen)
        self.timer = timer
        self.setPos((543,0))
        self.setSize((49,51))
        self.setType('push')
        textureI = pygame.Surface((10,10),pygame.SRCALPHA)
        textureI.set_alpha(0)
        self.setOverflyCalque(textureI)
        self.setStandardCalque(textureI)

    def action(self):
        self.timer.finish()

class Timer:
    def __init__(self):
        self._h = 0
        self._m = 0
        self._s = 0
        self.police = pygame.font.SysFont("arial",60)

    def setHour(self,value):
        if type(value) == int and tools.enter(value,0,23):
            self._h = value
        else:
            raise ValueError("argument is not integer number or it is not in [0;23]")

    def getHour(self):
        return self._h

    def setMinute(self,value):
        if type(value) == int and tools.enter(value,0,59):
            self._m = value
        else:
            raise ValueError("argument is not integer number or it is not in [0;23]")

    def getMinute(self):
        return self._m

    def setSecond(self,value):
        if type(value) == int and tools.enter(value,0,59):
            self._s = value
        else:
            raise ValueError("argument is not integer number or it is not in [0;23]")

    def getSecond(self):
        return self._s

    def finish(self):
        self.setHour(0)
        self.setMinute(0)
        self.setSecond(0)

    def isFinish(self):
        if self.getHour() == 0:
            if self.getMinute() == 0:
                if self.getSecond() == 0:
                    return True
        return False

    def getTotalTime(self):
        return self.getHour(),self.getMinute(),self.getSecond()

    def setTotalTime(self,h,m,s):
        self.setHour(h)
        self.setMinute(m)
        self.setSecond(s)

    def oneSecond(self):
        h,m,s = self.getTotalTime()
        if s == 0:
            s = 59
            if m == 0:
                m = 59
                if h != 0:
                    h -= 1
            else:
                m -= 1
        else:
            s -= 1
        self.setTotalTime(h,m,s)

    def render(self):
        s = self.getSecond()
        if s < 10:
            s = "0"+str(s)
        string = str(self.getMinute())+" : "+str(s)
        return self.police.render(string,True,(0,0,0))

class Map:
    def __init__(self,screen,timer,save,gold):
        self.screen = screen
        self.timer = timer
        self._victory = False
        self._save = save
        self.police = pygame.font.SysFont("arial",50)

        self.instance = {
        "B":{},
        "M":{},
        "T":{},
        "S":{}
        }

        self.creatButton()
        self.initSave(save,gold)

    def initSave(self,save,gold):
        screen = self.screen
        map = self
        timer = self.timer
        if save["Muraille1"]:
            inst = Wall()
            inst.setValue(screen,(283,242))
            if save["LVLMuraille1"] == 2:
                inst.levelUp()
            inst.setLife(save["PVMuraille1"])
            if save["Tour1Muraille1"] != 0:
                if save["Tour1Muraille1"] == 1:
                    instT = Alpha()
                elif save["Tour1Muraille1"] == 2:
                    instT = Beta()
                elif save["Tour1Muraille1"] == 3:
                    instT = Gamma()
                instT.setValue(screen,map,(283,307),inst)
                if save["lvlTourMuraille1"] == 2:
                    instT.levelUp()
                self.addInstance("T",10,instT)
        else:
            inst = Wall()
            inst.setValue(screen,(0,0))
            inst.setDeath(True)
        self.addInstance("M",1,inst)
        if save["Muraille2"]:
            inst = Wall()
            inst.setValue(screen,(458,77))
            if save["LVLMuraille2"] == 2:
                inst.levelUp()
            inst.setLife(save["PVMuraille2"])
            if save["Tour1Muraille2"] != 0:
                if save["Tour1Muraille2"] == 1:
                    instT = Alpha()
                elif save["Tour1Muraille2"] == 2:
                    instT = Beta()
                elif save["Tour1Muraille2"] == 3:
                    instT = Gamma()
                instT.setValue(screen,map,(458,142),inst)
                if save["lvlTourMuraille2"] == 2:
                    instT.levelUp()
                self.addInstance("T",20,instT)
        else:
            inst = Wall()
            inst.setValue(screen,(0,0))
            inst.setDeath(True)
        self.addInstance("M",2,inst)
        if save["Muraille3"]:
            inst = Wall()
            inst.setValue(screen,(630,376))
            if save["LVLMuraille3"] == 2:
                inst.levelUp()
            inst.setLife(save["PVMuraille3"])
            if save["Tour1Muraille3"] != 0:
                if save["Tour1Muraille3"] == 1:
                    instT = Alpha()
                elif save["Tour1Muraille3"] == 2:
                    instT = Beta()
                elif save["Tour1Muraille3"] == 3:
                    instT = Gamma()
                instT.setValue(screen,map,(630,441),inst)
                if save["lvlTourMuraille3"] == 2:
                    instT.levelUp()
                self.addInstance("T",30,instT)
        else:
            inst = Wall()
            inst.setValue(screen,(0,0))
            inst.setDeath(True)
        self.addInstance("M",3,inst)
        self.gold = gold
        self.targetGold = save["Gold"]

    def recrateSave(self):
        save = {}
        inst = self.getInstance("M",1)
        if not inst.getDeath():
            save["Muraille1"]=True
            save["PVMuraille1"]=inst.getLife()
            save["LVLMuraille1"]=self._save["LVLMuraille1"]
            save["Tour1Muraille1"]=self._save["Tour1Muraille1"]
            save["lvlTourMuraille1"]=self._save["lvlTourMuraille1"]
        else:
            save["Muraille1"]=False
            save["PVMuraille1"]=0
            save["LVLMuraille1"]=1
            save["Tour1Muraille1"]=0
            save["lvlTourMuraille1"]=1
        inst = self.getInstance("M",2)
        if not inst.getDeath():
            save["Muraille2"]=True
            save["PVMuraille2"]=inst.getLife()
            save["LVLMuraille2"]=self._save["LVLMuraille2"]
            save["Tour1Muraille2"]=self._save["Tour1Muraille2"]
            save["lvlTourMuraille2"]=self._save["lvlTourMuraille2"]
        else:
            save["Muraille2"]=False
            save["PVMuraille2"]=0
            save["LVLMuraille2"]=1
            save["Tour1Muraille2"]=0
            save["lvlTourMuraille2"]=1
        inst = self.getInstance("M",3)
        if not inst.getDeath():
            save["Muraille3"]=True
            save["PVMuraille3"]=inst.getLife()
            save["LVLMuraille3"]=self._save["LVLMuraille3"]
            save["Tour1Muraille3"]=self._save["Tour1Muraille3"]
            save["lvlTourMuraille3"]=self._save["lvlTourMuraille3"]
        else:
            save["Muraille3"]=False
            save["PVMuraille3"]=0
            save["LVLMuraille3"]=1
            save["Tour1Muraille3"]=0
            save["lvlTourMuraille3"]=1
        save["Gold"] = self.targetGold
        return save,self.getGold()

    def getGold(self):
        return self.gold

    def setGold(self,value):
        self.gold = value

    def addInstance(self,type,id,inst):
        print("add instance type",type,"id",id,"inst",inst)
        self.instance[type] [id] = inst

    def getInstance(self,type,id):
        return self.instance[type] [id]

    def getSoldat(self):
        result = [self.instance["S"] [i] for i in self.instance["S"]]
        return result

    def addSoldat(self,inst):
        id = uuid.uuid1()
        print("Add Soldat",id,"inst:",inst)
        self.instance["S"] [str(id)] = inst

    def creatButton(self):
        inst = BarbareButton()
        inst.setValue(self.screen,self,(80,600))
        self.addInstance("B",1,inst)
        inst = GolemButton()
        inst.setValue(self.screen,self,(400,615))
        self.addInstance("B",2,inst)
        inst = MilitaireButton()
        inst.setValue(self.screen,self,(680,615))
        self.addInstance("B",3,inst)
        inst = LevelUpButton()
        inst.setValue(self.screen,(95,670))
        self.addInstance("B",4,inst)
        inst = LevelUpButton()
        inst.setValue(self.screen,(395,670))
        self.addInstance("B",5,inst)
        inst = LevelUpButton()
        inst.setValue(self.screen,(675,670))
        self.addInstance("B",6,inst)
        inst = ArrowButton()
        inst.setValue(self.screen,self.timer)
        self.addInstance("B",0,inst)

    def victory(self):
        self._victory = True

    def getVictory(self):
        return self._victory

    def showGold(self):
        string = self.police.render(str(self.getGold()),True,(0,0,0))
        self.screen.blit(string,(0,0))

    def show(self):
        listM = [self.instance["M"] [i] for i in self.instance["M"]]
        listT = [self.instance["T"] [i] for i in self.instance["T"]]
        listB = [self.instance["B"] [i] for i in self.instance["B"]]
        listS = [self.instance["S"] [i] for i in self.instance["S"]]
        for inst in listM:
            inst.show()
        for inst in listT:
            if not inst.getDeath():
                inst.show()
            else:
                self.delInstance("T",inst)
        for inst in listB:
            inst.show()
        for inst in listS:
            if not inst.getDeath():
                inst.show()
            else:
                self.delInstance("S",inst)
        self.showGold()

    def delInstance(self,type,inst):
        list = [i for i in self.instance[type].keys()]
        for data in list:
            if self.instance[type] [data] == inst:
                print("remove instance",type,"uuid",data,"inst",self.instance[type] [data])
                del self.instance[type] [data]

    def event(self,pos,button):
        listT = [self.instance["T"] [i] for i in self.instance["T"]]
        listB = [self.instance["B"] [i] for i in self.instance["B"]]
        for inst in listT:
            inst.event(pos)
        for inst in listB:
            inst.event(pos,button)

    def attack(self):
        listT = [self.instance["T"] [i] for i in self.instance["T"]]
        listS = [self.instance["S"] [i] for i in self.instance["S"]]
        for inst in listT:
            inst.attack()
        for inst in listS:
            inst.attack()

    def mouve(self):
        listS = [self.instance["S"] [i] for i in self.instance["S"]]
        for inst in listS:
            inst.mouve()

def attaque(argJ):
    global gagner,player1save,player2save
    done = False
    if argJ == 1:
        save = player2save
        gold = player1save["Gold"]
    else:
        save = player1save
        gold = player2save["Gold"]
    timer = Timer()

    map = Map(fenetre,timer,save,gold)

    eventTimeId = pygame.USEREVENT+1
    eventTime = pygame.USEREVENT+2
    pygame.time.set_timer(eventTimeId,1000)
    pygame.time.set_timer(eventTime,50)

    timer.setTotalTime(0,2,0)

    while not done:
        pygame.time.Clock().tick(80)
        for event in pygame.event.get():
            if event.type == pygame.QUIT:
                pygame.quit()
                quit()
            elif event.type == eventTimeId:
                timer.oneSecond()
            elif event.type == eventTime:
                map.attack()
                map.mouve()
            elif event.type == pygame.MOUSEMOTION:
                map.event(event.pos,0)
            elif event.type == pygame.MOUSEBUTTONDOWN:
                map.event(event.pos,event.button)
        fenetre.blit(texture["fond"],(0,0))
        map.show()
        fenetre.blit(timer.render(),(640,-10))
        if map.getVictory() or timer.isFinish():
            done = True
        pygame.display.flip()

    if map.getVictory():
        gagner += argJ

    if argJ == 1:
        player2save,player1save["Gold"] = map.recrateSave()
    else:
        player1save,player2save["Gold"] = map.recrateSave()

def MainMenu():
    screen = fenetre
    menuOpen = False
    texture = {
        "fond":pygame.image.load("fondMenu.png").convert(),
        "buttonPlay":pygame.image.load("Bouton Play.png").convert(),
        "buttonPlayA":pygame.image.load("Bouton Play Appuye.png").convert(),
        "buttonRules":pygame.image.load("Bouton Rules.png").convert(),
        "buttonRulesA":pygame.image.load("Bouton Rules Appuye.png").convert(),
        "title":pygame.font.Font("Inkfree.ttf",110).render("Tower Defence",True,(0,0,0))
    }
    eventKey = 0
    eventPos = [0,0]
    eventButton = 0
    eventUnicode = ""
    policeMenu1 = pygame.font.Font("Inkfree.ttf",40)
    policeMenu2 = pygame.font.Font("Inkfree.ttf",20)
    menuPos = 0
    menuMax = 1800

    RulesFond = pygame.Surface((600,500))
    RulesFond.fill((50,50,50))
    pygame.draw.rect(RulesFond,(150,150,150),[5,5,590,490])

    def UpdateNormale():
        screen.blit(texture["title"],(50,100))
        screen.blit(texture["buttonPlay"],(350,350))
        screen.blit(texture["buttonRules"],(350,450))

    def UpdateRules():
        listT = [
        "Somaire:",
        "  Les règles",
        "  L'interface utilisateur",
        "  les stats",
        "",
        "Les règles:",
        "  Le but du jeu est de prendre le chateau de l'adversaire. Pour ce faire",
        "  vous allez alterner les phases défensises et offencives. Dans les",
        "  phases défensises, vous allez pouvoir construire ou améliorer les",
        "  murailles ainsi que les tours. Dans la phase offensive, vous ",
        "  emmènerez votre armé au combat dans un temps imparti.",
        "",
        "Utilisation de l'interface en phase de défence:",
        "  La plus part des contrôles se trouvent sur la partie basse de la ",
        "  fenetre. Sur la barre de haut de l'écran se trouve la réserve d'or",
        "  ainsi qu'une fléche permetant de finir son tour. Quand à elle, la ",
        "  barre du bas est divisée en quatre parties. Chaques parties ",
        "  contienent deux types de bouttons: les bouttons nommés BUILD, ",
        "  REPAIR ou LVL UP sont des boutons poussoirs qui peuvent être ",
        "  activés ou désactivé si on fait un clic gauche dessus. L'autre",
        "  type de boutton est des bouttons avec des chiffres. Ces bouttons",
        "  servent à choisir l'emplacement de l'action preselectionné. Ils",
        "  correspondent à leurs équivalents sur la zone de jeu. La barre du",
        "  bas est répartie en quatre partie, correspondant de gauche à droite",
        "  au muraille, tour alpha, tour beta et tour gama. pour construire ",
        "  une tour, il est necessaire que la murraille de l'emplacement soit ",
        "  préalablement construite. Lors du premier clic, une première tour",
        "  sera construite puis une seconde lors de deuxiéme clic sur le boutton",
        "  de selection de position. Les prix des constructions, améliorations",
        "  et des réparations sont donnés à la fin de cette aide.",
        "",
        "Utilisation de l'interface en phase offensive:",
        "  Comme dans la phase défensive, l'interface est de nouveau en trois ",
        "  parties. La barre du haut contient l'indication de l'argent restant",
        "  ainsi que la fléche pour finir son tour. La partie centrale sert de",
        "  visuel en temps réel de l'attaque, vous ne pouvez pas faire ",
        "  d'interaction avec. La derniere partie est la barre du bas, elle",
        "  contient tous le necessaire pour lancer une belle attaque! Elle est",
        "  faite en trois blocs, pour les trois types d'unités que l'on peut ",
        "  envoyer. Le boutton LVL UP peut, comme dans la phase défensive,",
        "  être activé ou désactivé. Il permet de choisir entre des unités de",
        "  niveau deux ou basique. Pour déployer l'unité, il suffit de cliquer sur ",
        "  la petite illustration de l'unité. L'unité est dés lors envoyée sur",
        "  le chemin, elle se deplacera jusqu'a la premiére defence qu'elle ",
        "  tentera de détruire.Pour qu'un joueur gagne, il faut que au moins ",
        "  une de ces unité entre dans le chateau adverse.",
        "",
        "Statistique des éléments du jeu:",
        "PO:power   SP:speed",
        "",
        "Crédit:",
        "  développé par:",
        "    Pierre LEGRAND",
        "    Pierre GRIMMER",
        "    Maxime FALKOWSKI",
        "",
        "Pour quiter, faite échap."
        ]
        screen.blit(RulesFond,(100,100))
        a = pygame.Surface((590,menuMax),pygame.SRCALPHA)
        a.blit(policeMenu1.render("Bienvenue dans Tower Defence !",True,(0,0,0)),(30,10))
        for nbr in range(0,len(listT)):
            a.blit(policeMenu2.render(listT[nbr],True,(0,0,0)),(10,60+nbr*20))
        screen.blit(a.subsurface(0,menuPos,590,489),(105,105))

    def Update(menuOpen, menuPos):
        screen.blit(texture["fond"], (0,0))
        UpdateNormale()
        if menuOpen == True:
            if eventButton == 5:
                if menuPos + 490 < menuMax-50:
                    menuPos += 50
            elif eventButton == 4:
                if menuPos>50:
                    menuPos -= 50
                else:
                    menuPos = 0
            if eventKey == 27:
                menuOpen = False
            UpdateRules()
        elif eventPos[0] >= 350 and eventPos[0] <= 450:
            if eventPos[1] >= 350 and eventPos[1] <= 400:
                if eventButton != 1:
                    screen.blit(texture["buttonPlayA"],(350,350))
                else:
                    initialization()
            elif eventPos[1] >= 450 and eventPos[1] <= 500:
                if eventButton != 1:
                    screen.blit(texture["buttonRulesA"],(350,450))
                else:
                    menuOpen = True
                    menuPos = 0

        pygame.display.flip()
        return menuOpen,menuPos
    done = False

    while not done:
        pygame.time.Clock().tick(24)
        for event in pygame.event.get():
            if event.type == pygame.QUIT:
                pygame.quit()
                quit()
            elif event.type == pygame.MOUSEMOTION:
                eventPos = event.pos
            elif event.type == pygame.MOUSEBUTTONDOWN:
                eventPos = event.pos
                eventButton = event.button
            elif event.type == pygame.KEYDOWN:
                eventUnicode = event.unicode
                eventKey = event.key
        menuOpen,menuPos = Update(menuOpen,menuPos)
        eventKey = 0
        eventUnicode = ""
        eventButton = 0

fenetre = pygame.display.set_mode((800,700))

MainMenu()
