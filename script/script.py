'''
------------------------------
INSTANTIATE CHAIR CLASS AND TABLE
------------------------------
'''

class Chair:
        ID = 1
        Occupied = False
        RecentlyOccupied = False
        LatA = 56.460166
        LongA = -2.978129
        LatB = 56.460167
        LongB = -2.978121
        LatC = 56.460162
        LongC = -2.978119
        LatD = 56.460161
        LongD = -2.978127
        leaveChance = 55
        UniqueOccupants = 0
        tableID = 1


class Table:
    ID = 1
    LatA = 56.460166
    LongA = -2.978129
    LatB = 56.460167
    LongB = -2.978122
    LatC = 56.460162
    LongC = -2.978127
    LatD = 56.460163
    LongD = -2.978120


'''
------------------------------
CREATE ARRAY OF CHAIR OBJECTS
------------------------------
'''

chairArray = []
for x in range(66):
    chairArray.append(Chair())



'''
------------------------------
ASSIGN UNIQUE INFORMATION FOR EACH CHAIR AND TABLE
------------------------------
'''

chairArray[1].ID = 2
chairArray[1].Occupied = False
chairArray[1].RecentlyOccupied = False
chairArray[1].LatA = 56.460171
chairArray[1].LongA = -2.978090
chairArray[1].LatB = 56.460170
chairArray[1].LongB = -2.978098
chairArray[1].LatC = 56.460165
chairArray[1].LongC = -2.978096
chairArray[1].LatD = 56.460166
chairArray[1].LongD = -2.978088

chairArray[2].ID = 3
chairArray[2].Occupied = False
chairArray[2].RecentlyOccupied = False
chairArray[2].LatA = 56.460157
chairArray[2].LongA = -2.978117
chairArray[2].LatB = 56.460156
chairArray[2].LongB = -2.978125
chairArray[2].LatC = 56.460151
chairArray[2].LongC = -2.978123
chairArray[2].LatD = 56.460152
chairArray[2].LongD = -2.978115

chairArray[3].ID = 4
chairArray[3].Occupied = False
chairArray[3].RecentlyOccupied = False
chairArray[3].LatA = 56.460161
chairArray[3].LongA = -2.978086
chairArray[3].LatB = 56.460160
chairArray[3].LongB = -2.978094
chairArray[3].LatC = 56.460155
chairArray[3].LongC = -2.978092
chairArray[3].LatD = 56.460156
chairArray[3].LongD = -2.978084

chairArray[4].ID = 5
chairArray[4].Occupied = False
chairArray[4].RecentlyOccupied = False
chairArray[4].LatA = 56.460148
chairArray[4].LongA = -2.978113
chairArray[4].LatB = 56.460147
chairArray[4].LongB = -2.978121
chairArray[4].LatC = 56.460142
chairArray[4].LongC = -2.978119
chairArray[4].LatD = 56.460143
chairArray[4].LongD = -2.978111

chairArray[5].ID = 6
chairArray[5].Occupied = False
chairArray[5].RecentlyOccupied = False
chairArray[5].LatA = 56.460152
chairArray[5].LongA = -2.978082
chairArray[5].LatB = 56.460151
chairArray[5].LongB = -2.978090
chairArray[5].LatC = 56.460146
chairArray[5].LongC = -2.978088
chairArray[5].LatD = 56.460147
chairArray[5].LongD = -2.978080

chairArray[6].ID = 7
chairArray[6].Occupied = False
chairArray[6].RecentlyOccupied = False
chairArray[6].LatA = 56.460139
chairArray[6].LongA = -2.978110
chairArray[6].LatB = 56.460138
chairArray[6].LongB = -2.978118
chairArray[6].LatC = 56.460133
chairArray[6].LongC = -2.978116
chairArray[6].LatD = 56.460134
chairArray[6].LongD = -2.978108

chairArray[7].ID = 8
chairArray[7].Occupied = False
chairArray[7].RecentlyOccupied = False
chairArray[7].LatA = 56.460143
chairArray[7].LongA = -2.978079
chairArray[7].LatB = 56.460142
chairArray[7].LongB = -2.978087
chairArray[7].LatC = 56.460137
chairArray[7].LongC = -2.978085
chairArray[7].LatD = 56.460138
chairArray[7].LongD = -2.978077
#End of table 1

#Table 2
chairArray[8].ID = 9
chairArray[8].Occupied = False
chairArray[8].RecentlyOccupied = False
chairArray[8].LatA = 56.460193
chairArray[8].LongA = -2.978111
chairArray[8].LatB = 56.460192
chairArray[8].LongB = -2.978120
chairArray[8].LatC = 56.460196
chairArray[8].LongC = -2.978121
chairArray[8].LatD = 56.460197
chairArray[8].LongD = -2.978112

chairArray[9].ID = 10
chairArray[9].Occupied = False
chairArray[9].RecentlyOccupied = False
chairArray[9].LatA = 56.460203
chairArray[9].LongA = -2.978131
chairArray[9].LatB = 56.460202
chairArray[9].LongB = -2.978140
chairArray[9].LatC = 56.460197
chairArray[9].LongC = -2.978138
chairArray[9].LatD = 56.460198
chairArray[9].LongD = -2.978129

chairArray[10].ID = 11
chairArray[10].Occupied = False
chairArray[10].RecentlyOccupied = False
chairArray[10].LatA = 56.460207
chairArray[10].LongA = -2.978102
chairArray[10].LatB = 56.460206
chairArray[10].LongB = -2.978109
chairArray[10].LatC = 56.460201
chairArray[10].LongC = -2.978107
chairArray[10].LatD = 56.460202
chairArray[10].LongD = -2.978100

chairArray[11].ID = 12
chairArray[11].Occupied = False
chairArray[11].RecentlyOccupied = False
chairArray[11].LatA = 56.460212
chairArray[11].LongA = -2.978127
chairArray[11].LatB = 56.460208
chairArray[11].LongB = -2.978125
chairArray[11].LatC = 56.460209
chairArray[11].LongC = -2.978116
chairArray[11].LatD = 56.460213
chairArray[11].LongD = -2.978118
#End of Table2

#Table 3
chairArray[12].ID = 13
chairArray[12].Occupied = False
chairArray[12].RecentlyOccupied = False
chairArray[12].LatA = 56.460242
chairArray[12].LongA = -2.978128
chairArray[12].LatB = 56.460241
chairArray[12].LongB = -2.978136
chairArray[12].LatC = 56.460236
chairArray[12].LongC = -2.978134
chairArray[12].LatD = 56.460237
chairArray[12].LongD = -2.978126

chairArray[13].ID = 14
chairArray[13].Occupied = False
chairArray[13].RecentlyOccupied = False
chairArray[13].LatA = 56.460231
chairArray[13].LongA = -2.978150
chairArray[13].LatB = 56.460226
chairArray[13].LongB = -2.978148
chairArray[13].LatC = 56.460227
chairArray[13].LongC = -2.978139
chairArray[13].LatD = 56.460232
chairArray[13].LongD = -2.978141

chairArray[14].ID = 15
chairArray[14].Occupied = False
chairArray[14].RecentlyOccupied = False
chairArray[14].LatA = 56.460235
chairArray[14].LongA = -2.978112
chairArray[14].LatB = 56.460234
chairArray[14].LongB = -2.978119
chairArray[14].LatC = 56.460230
chairArray[14].LongC = -2.978118
chairArray[14].LatD = 56.460231
chairArray[14].LongD = -2.978110

chairArray[15].ID = 16
chairArray[15].Occupied = False
chairArray[15].RecentlyOccupied = False
chairArray[15].LatA = 56.460220
chairArray[15].LongA = -2.978120
chairArray[15].LatB = 56.460225
chairArray[15].LongB = -2.978122
chairArray[15].LatC = 56.460224
chairArray[15].LongC = -2.978130
chairArray[15].LatD = 56.460219
chairArray[15].LongD = -2.978128
#Emd of table 3


#Table 4
chairArray[16].ID = 17
chairArray[16].Occupied = False
chairArray[16].RecentlyOccupied = False
chairArray[16].LatA = 56.460241
chairArray[16].LongA = -2.978071
chairArray[16].LatB = 56.460240
chairArray[16].LongB = -2.978080
chairArray[16].LatC = 56.460235
chairArray[16].LongC = -2.978078
chairArray[16].LatD = 56.460236
chairArray[16].LongD = -2.978069

chairArray[17].ID = 18
chairArray[17].Occupied = False
chairArray[17].RecentlyOccupied = False
chairArray[17].LatA = 56.460231
chairArray[17].LongA = -2.978067
chairArray[17].LatB = 56.460230
chairArray[17].LongB = -2.978076
chairArray[17].LatC = 56.460225
chairArray[17].LongC = -2.978074
chairArray[17].LatD = 56.460226
chairArray[17].LongD = -2.978065

chairArray[18].ID = 19
chairArray[18].Occupied = False
chairArray[18].RecentlyOccupied = False
chairArray[18].LatA = 56.460222
chairArray[18].LongA = -2.978064
chairArray[18].LatB = 56.460221
chairArray[18].LongB = -2.978072
chairArray[18].LatC = 56.460216
chairArray[18].LongC = -2.978070
chairArray[18].LatD = 56.460217
chairArray[18].LongD = -2.978062

chairArray[19].ID = 20
chairArray[19].Occupied = False
chairArray[19].RecentlyOccupied = False
chairArray[19].LatA = 56.460213
chairArray[19].LongA = -2.978060
chairArray[19].LatB = 56.460212
chairArray[19].LongB = -2.978069
chairArray[19].LatC = 56.460207
chairArray[19].LongC = -2.978067
chairArray[19].LatD = 56.460208
chairArray[19].LongD = -2.978058

chairArray[20].ID = 21
chairArray[20].Occupied = False
chairArray[20].RecentlyOccupied = False
chairArray[20].LatA = 56.460245
chairArray[20].LongA = -2.978040
chairArray[20].LatB = 56.460244
chairArray[20].LongB = -2.978048
chairArray[20].LatC = 56.460239
chairArray[20].LongC = -2.978046
chairArray[20].LatD = 56.460240
chairArray[20].LongD = -2.978038

chairArray[21].ID = 22
chairArray[21].Occupied = False
chairArray[21].RecentlyOccupied = False
chairArray[21].LatA = 56.460235
chairArray[21].LongA = -2.978036
chairArray[21].LatB = 56.460234
chairArray[21].LongB = -2.978044
chairArray[21].LatC = 56.460229
chairArray[21].LongC = -2.978042
chairArray[21].LatD = 56.460230
chairArray[21].LongD = -2.978034

chairArray[22].ID = 23
chairArray[22].Occupied = False
chairArray[22].RecentlyOccupied = False
chairArray[22].LatA = 56.460225
chairArray[22].LongA = -2.978032
chairArray[22].LatB = 56.460224
chairArray[22].LongB = -2.978040
chairArray[22].LatC = 56.460220
chairArray[22].LongC = -2.978038
chairArray[22].LatD = 56.460221
chairArray[22].LongD = -2.978030

chairArray[23].ID = 24
chairArray[23].Occupied = False
chairArray[23].RecentlyOccupied = False
chairArray[23].LatA = 56.460217
chairArray[23].LongA = -2.978029
chairArray[23].LatB = 56.460216
chairArray[23].LongB = -2.978037
chairArray[23].LatC = 56.460211
chairArray[23].LongC = -2.978035
chairArray[23].LatD = 56.460212
chairArray[23].LongD = -2.978027
#End of table 4

#Table 5
chairArray[24].ID = 25
chairArray[24].Occupied = False
chairArray[24].RecentlyOccupied = False
chairArray[24].LatA = 56.460176
chairArray[24].LongA = -2.978048
chairArray[24].LatB = 56.460175
chairArray[24].LongB = -2.978057
chairArray[24].LatC = 56.460170
chairArray[24].LongC = -2.978055
chairArray[24].LatD = 56.460171
chairArray[24].LongD = -2.978046

chairArray[25].ID = 26
chairArray[25].Occupied = False
chairArray[25].RecentlyOccupied = False
chairArray[25].LatA = 56.460166
chairArray[25].LongA = -2.978044
chairArray[25].LatB = 56.460165
chairArray[25].LongB = -2.978053
chairArray[25].LatC = 56.460160
chairArray[25].LongC = -2.978051
chairArray[25].LatD = 56.460161
chairArray[25].LongD = -2.978042

chairArray[26].ID = 27
chairArray[26].Occupied = False
chairArray[26].RecentlyOccupied = False
chairArray[26].LatA =56.460157
chairArray[26].LongA = -2.978041
chairArray[26].LatB = 56.460156
chairArray[26].LongB = -2.978049
chairArray[26].LatC = 56.460151
chairArray[26].LongC = -2.978047
chairArray[26].LatD = 56.460152
chairArray[26].LongD = -2.978039

chairArray[27].ID = 28
chairArray[27].Occupied = False
chairArray[27].RecentlyOccupied = False
chairArray[27].LatA = 56.460148
chairArray[27].LongA = -2.978037
chairArray[27].LatB = 56.460147
chairArray[27].LongB = -2.978046
chairArray[27].LatC = 56.460142
chairArray[27].LongC = -2.978044
chairArray[27].LatD = 56.460143
chairArray[27].LongD = -2.978035

chairArray[28].ID = 29
chairArray[28].Occupied = False
chairArray[28].RecentlyOccupied = False
chairArray[28].LatA = 56.460180
chairArray[28].LongA = -2.978017
chairArray[28].LatB = 56.460179
chairArray[28].LongB = -2.978025
chairArray[28].LatC = 56.460174
chairArray[28].LongC = -2.978023
chairArray[28].LatD = 56.460175
chairArray[28].LongD = -2.978015

chairArray[29].ID = 30
chairArray[29].Occupied = False
chairArray[29].RecentlyOccupied = False
chairArray[29].LatA = 56.460170
chairArray[29].LongA = -2.978013
chairArray[29].LatB = 56.460169
chairArray[29].LongB = -2.978021
chairArray[29].LatC = 56.460164
chairArray[29].LongC = -2.978019
chairArray[29].LatD = 56.460165
chairArray[29].LongD = -2.978011

chairArray[30].ID = 31
chairArray[30].Occupied = False
chairArray[30].RecentlyOccupied = False
chairArray[30].LatA = 56.460161
chairArray[30].LongA = -2.978010
chairArray[30].LatB = 56.460160
chairArray[30].LongB = -2.978018
chairArray[30].LatC = 56.460155
chairArray[30].LongC = -2.978016
chairArray[30].LatD = 56.460156
chairArray[30].LongD = -2.978008

chairArray[31].ID = 32
chairArray[31].Occupied = False
chairArray[31].RecentlyOccupied = False
chairArray[31].LatA = 56.460152
chairArray[31].LongA = -2.978007
chairArray[31].LatB = 56.460151
chairArray[31].LongB = -2.978015
chairArray[31].LatC = 56.460146
chairArray[31].LongC = -2.978013
chairArray[31].LatD = 56.460147
chairArray[31].LongD = -2.978005
#End of Table5

#Table 6
chairArray[32].ID = 33
chairArray[32].Occupied = False
chairArray[32].RecentlyOccupied = False
chairArray[32].LatA = 56.460100
chairArray[32].LongA = -2.978212
chairArray[32].LatB = 56.460099
chairArray[32].LongB = -2.978221
chairArray[32].LatC = 56.460095
chairArray[32].LongC = -2.978219
chairArray[32].LatD = 56.460096
chairArray[32].LongD = -2.978210

chairArray[33].ID = 34
chairArray[33].Occupied = False
chairArray[33].RecentlyOccupied = False
chairArray[33].LatA = 56.460091
chairArray[33].LongA = -2.978225
chairArray[33].LatB = 56.460090
chairArray[33].LongB = -2.978234
chairArray[33].LatC = 56.460084
chairArray[33].LongC = -2.978232
chairArray[33].LatD = 56.460085
chairArray[33].LongD = -2.978223

chairArray[34].ID = 35
chairArray[34].Occupied = False
chairArray[34].RecentlyOccupied = False
chairArray[34].LatA = 56.460089
chairArray[34].LongA = -2.978193
chairArray[34].LatB = 56.460094
chairArray[34].LongB = -2.978195
chairArray[34].LatC = 56.460093
chairArray[34].LongC = -2.978203
chairArray[34].LatD = 56.460088
chairArray[34].LongD = -2.978201

chairArray[35].ID = 36
chairArray[35].Occupied = False
chairArray[35].RecentlyOccupied = False
chairArray[35].LatA = 56.460079
chairArray[35].LongA = -2.978204
chairArray[35].LatB = 56.460078
chairArray[35].LongB = -2.978213
chairArray[35].LatC = 56.460083
chairArray[35].LongC = -2.978215
chairArray[35].LatD = 56.460084
chairArray[35].LongD = -2.978206
#Emd of table 6

#Table 7
chairArray[36].ID = 37
chairArray[36].Occupied = False
chairArray[36].RecentlyOccupied = False
chairArray[36].LatA = 56.460087
chairArray[36].LongA = -2.978150
chairArray[36].LatB = 56.460086
chairArray[36].LongB = -2.978158
chairArray[36].LatC = 56.460090
chairArray[36].LongC = -2.978160
chairArray[36].LatD = 56.460091
chairArray[36].LongD = -2.978152

chairArray[37].ID = 38
chairArray[37].Occupied = False
chairArray[37].RecentlyOccupied = False
chairArray[37].LatA = 56.460097
chairArray[37].LongA = -2.978180
chairArray[37].LatB = 56.460092
chairArray[37].LongB = -2.978178
chairArray[37].LatC = 56.460093
chairArray[37].LongC = -2.978169
chairArray[37].LatD = 56.460098
chairArray[37].LongD = -2.978171

chairArray[38].ID = 39
chairArray[38].Occupied = False
chairArray[38].RecentlyOccupied = False
chairArray[38].LatA = 56.460107
chairArray[38].LongA = -2.978158
chairArray[38].LatB = 56.460106
chairArray[38].LongB = -2.978167
chairArray[38].LatC = 56.460102
chairArray[38].LongC = -2.978165
chairArray[38].LatD = 56.460103
chairArray[38].LongD = -2.978157

chairArray[39].ID = 40
chairArray[39].Occupied = False
chairArray[39].RecentlyOccupied = False
chairArray[39].LatA = 56.460101
chairArray[39].LongA = -2.978142
chairArray[39].LatB = 56.460100
chairArray[39].LongB = -2.978150
chairArray[39].LatC = 56.460095
chairArray[39].LongC = -2.978148
chairArray[39].LatD = 56.460096
chairArray[39].LongD = -2.978140
#End of Table 7

#Table 8
chairArray[40].ID = 41
chairArray[40].Occupied = False
chairArray[40].RecentlyOccupied = False
chairArray[40].LatA = 56.460060
chairArray[40].LongA = -2.978204
chairArray[40].LatB = 56.460061
chairArray[40].LongB = -2.978195
chairArray[40].LatC = 56.460056
chairArray[40].LongC = -2.978193
chairArray[40].LatD = 56.460055
chairArray[40].LongD = -2.978202

chairArray[41].ID = 42
chairArray[41].Occupied = False
chairArray[41].RecentlyOccupied = False
chairArray[41].LatA = 56.460055
chairArray[41].LongA = -2.978179
chairArray[41].LatB = 56.460050
chairArray[41].LongB = -2.978177
chairArray[41].LatC = 56.460049
chairArray[41].LongC = -2.978185
chairArray[41].LatD = 56.460054
chairArray[41].LongD = -2.978187

chairArray[42].ID = 43
chairArray[42].Occupied = False
chairArray[42].RecentlyOccupied = False
chairArray[42].LatA = 56.460040
chairArray[42].LongA = -2.978187
chairArray[42].LatB = 56.460039
chairArray[42].LongB = -2.978196
chairArray[42].LatC = 56.460044
chairArray[42].LongC = -2.978198
chairArray[42].LatD = 56.460045
chairArray[42].LongD = -2.978189

chairArray[43].ID = 44
chairArray[43].Occupied = False
chairArray[43].RecentlyOccupied = False
chairArray[43].LatA = 56.460046
chairArray[43].LongA = -2.978206
chairArray[43].LatB = 56.460051
chairArray[43].LongB = -2.978208
chairArray[43].LatC = 56.460050
chairArray[43].LongC = -2.978217
chairArray[43].LatD = 56.460045
chairArray[43].LongD = -2.978215
#End of table 8

#Table 9
chairArray[44].ID = 45
chairArray[44].Occupied = False
chairArray[44].RecentlyOccupied = False
chairArray[44].LatA = 56.460068
chairArray[44].LongA = -2.978142
chairArray[44].LatB = 56.460067
chairArray[44].LongB = -2.978149
chairArray[44].LatC = 56.460063
chairArray[44].LongC = -2.978148
chairArray[44].LatD = 56.460064
chairArray[44].LongD = -2.978140

chairArray[45].ID = 46
chairArray[45].Occupied = False
chairArray[45].RecentlyOccupied = False
chairArray[45].LatA = 56.460059
chairArray[45].LongA = -2.978154
chairArray[45].LatB = 56.460058
chairArray[45].LongB = -2.978163
chairArray[45].LatC = 56.460053
chairArray[45].LongC = -2.978161
chairArray[45].LatD = 56.460054
chairArray[45].LongD = -2.978152

chairArray[46].ID = 47
chairArray[46].Occupied = False
chairArray[46].RecentlyOccupied = False
chairArray[46].LatA = 56.460048
chairArray[46].LongA = -2.978133
chairArray[46].LatB = 56.460052
chairArray[46].LongB = -2.978135
chairArray[46].LatC = 56.460051
chairArray[46].LongC = -2.978144
chairArray[46].LatD = 56.460047
chairArray[46].LongD = -2.978142

chairArray[47].ID = 48
chairArray[47].Occupied = False
chairArray[47].RecentlyOccupied = False
chairArray[47].LatA = 56.460062
chairArray[47].LongA = -2.978126
chairArray[47].LatB = 56.460061
chairArray[47].LongB = -2.978133
chairArray[47].LatC = 56.460056
chairArray[47].LongC = -2.978131
chairArray[47].LatD = 56.460057
chairArray[47].LongD = -2.978124
#End of table 9

#Table 10
chairArray[48].ID = 49
chairArray[48].Occupied = False
chairArray[48].RecentlyOccupied = False
chairArray[48].LatA = 56.460092
chairArray[48].LongA = -2.978090
chairArray[48].LatB = 56.460091
chairArray[48].LongB = -2.978099
chairArray[48].LatC = 56.460086
chairArray[48].LongC = -2.978097
chairArray[48].LatD = 56.460087
chairArray[48].LongD = -2.978088

chairArray[49].ID = 50
chairArray[49].Occupied = False
chairArray[49].RecentlyOccupied = False
chairArray[49].LatA = 56.460082
chairArray[49].LongA = -2.978086
chairArray[49].LatB = 56.460081
chairArray[49].LongB = -2.978095
chairArray[49].LatC = 56.460076
chairArray[49].LongC = -2.978093
chairArray[49].LatD = 56.460077
chairArray[49].LongD = -2.978084

chairArray[50].ID = 51
chairArray[50].Occupied = False
chairArray[50].RecentlyOccupied = False
chairArray[50].LatA = 56.460073
chairArray[50].LongA = -2.978082
chairArray[50].LatB = 56.460072
chairArray[50].LongB = -2.978091
chairArray[50].LatC = 56.460067
chairArray[50].LongC = -2.978089
chairArray[50].LatD = 56.460068
chairArray[50].LongD = -2.978080

chairArray[51].ID = 52
chairArray[51].Occupied = False
chairArray[51].RecentlyOccupied = False
chairArray[51].LatA = 56.460064
chairArray[51].LongA = -2.978079
chairArray[51].LatB = 56.460063
chairArray[51].LongB = -2.978088
chairArray[51].LatC = 56.460058
chairArray[51].LongC = -2.978086
chairArray[51].LatD = 56.460059
chairArray[51].LongD = -2.978077

chairArray[52].ID = 53
chairArray[52].Occupied = False
chairArray[52].RecentlyOccupied = False
chairArray[52].LatA = 56.460096
chairArray[52].LongA = -2.978059
chairArray[52].LatB = 56.460095
chairArray[52].LongB = -2.978067
chairArray[52].LatC = 56.460090
chairArray[52].LongC = -2.978065
chairArray[52].LatD = 56.460091
chairArray[52].LongD = -2.978057

chairArray[53].ID = 54
chairArray[53].Occupied = False
chairArray[53].RecentlyOccupied = False
chairArray[53].LatA = 56.460086
chairArray[53].LongA = -2.978055
chairArray[53].LatB = 56.460085
chairArray[53].LongB = -2.978063
chairArray[53].LatC = 56.460080
chairArray[53].LongC = -2.978061
chairArray[53].LatD = 56.460081
chairArray[53].LongD = -2.978053

chairArray[54].ID = 55
chairArray[54].Occupied = False
chairArray[54].RecentlyOccupied = False
chairArray[54].LatA = 56.460077
chairArray[54].LongA = -2.978052
chairArray[54].LatB = 56.460076
chairArray[54].LongB = -2.978060
chairArray[54].LatC = 56.460071
chairArray[54].LongC = -2.978058
chairArray[54].LatD = 56.460072
chairArray[54].LongD = -2.978050

chairArray[55].ID = 56
chairArray[55].Occupied = False
chairArray[55].RecentlyOccupied = False
chairArray[55].LatA = 56.460068
chairArray[55].LongA = -2.978048
chairArray[55].LatB = 56.460067
chairArray[55].LongB = -2.978056
chairArray[55].LatC = 56.460062
chairArray[55].LongC = -2.978054
chairArray[55].LatD = 56.460063
chairArray[55].LongD = -2.978046

chairArray[56].ID = 57
chairArray[56].Occupied = False
chairArray[56].RecentlyOccupied = False
chairArray[56].LatA = 56.460152
chairArray[56].LongA = -2.978007
chairArray[56].LatB = 56.460151
chairArray[56].LongB = -2.978015
chairArray[56].LatC = 56.460146
chairArray[56].LongC = -2.978013
chairArray[56].LatD = 56.460147
chairArray[56].LongD = -2.978005
#End of Table5

#Table 6
chairArray[57].ID = 58
chairArray[57].Occupied = False
chairArray[57].RecentlyOccupied = False
chairArray[57].LatA = 56.460102
chairArray[57].LongA = -2.978020
chairArray[57].LatB = 56.460101
chairArray[57].LongB = -2.978029
chairArray[57].LatC = 56.460096
chairArray[57].LongC = -2.978027
chairArray[57].LatD = 56.460097
chairArray[57].LongD = -2.978018

chairArray[58].ID = 59
chairArray[58].Occupied = False
chairArray[58].RecentlyOccupied = False
chairArray[58].LatA = 56.460091
chairArray[58].LongA = -2.978016
chairArray[58].LatB = 56.460090
chairArray[58].LongB = -2.978025
chairArray[58].LatC = 56.460085
chairArray[58].LongC = -2.978023
chairArray[58].LatD = 56.460086
chairArray[58].LongD = -2.978014

chairArray[59].ID = 60
chairArray[59].Occupied = False
chairArray[59].RecentlyOccupied = False
chairArray[59].LatA = 56.460082
chairArray[59].LongA = -2.978013
chairArray[59].LatB = 56.460081
chairArray[59].LongB = -2.978021
chairArray[59].LatC = 56.460076
chairArray[59].LongC = -2.978019
chairArray[59].LatD = 56.460077
chairArray[59].LongD = -2.978011

chairArray[60].ID = 61
chairArray[60].Occupied = False
chairArray[60].RecentlyOccupied = False
chairArray[60].LatA = 56.460074
chairArray[60].LongA =-2.978009
chairArray[60].LatB = 56.460073
chairArray[60].LongB = -2.978017
chairArray[60].LatC = 56.460068
chairArray[60].LongC = -2.978015
chairArray[60].LatD = 56.460069
chairArray[60].LongD = -2.978007
#Emd of table 6

#Table 7
chairArray[61].ID = 62
chairArray[61].Occupied = False
chairArray[61].RecentlyOccupied = False
chairArray[61].LatA = 56.460087
chairArray[61].LongA = -2.978150
chairArray[61].LatB = 56.460086
chairArray[61].LongB = -2.978158
chairArray[61].LatC = 56.460090
chairArray[61].LongC = -2.978160
chairArray[61].LatD = 56.460091
chairArray[61].LongD = -2.978152

chairArray[62].ID = 63
chairArray[62].Occupied = False
chairArray[62].RecentlyOccupied = False
chairArray[62].LatA = 56.460105
chairArray[62].LongA = -2.977989
chairArray[62].LatB = 56.460104
chairArray[62].LongB = -2.977997
chairArray[62].LatC = 56.460099
chairArray[62].LongC = -2.977995
chairArray[62].LatD = 56.460100
chairArray[62].LongD = -2.977987

chairArray[63].ID = 64
chairArray[63].Occupied = False
chairArray[63].RecentlyOccupied = False
chairArray[63].LatA = 56.460095
chairArray[63].LongA = -2.977985
chairArray[63].LatB = 56.460094
chairArray[63].LongB = -2.977993
chairArray[63].LatC = 56.460089
chairArray[63].LongC = -2.977991
chairArray[63].LatD = 56.460090
chairArray[63].LongD = -2.977983

chairArray[64].ID = 65
chairArray[64].Occupied = False
chairArray[64].RecentlyOccupied = False
chairArray[64].LatA = 56.460086
chairArray[64].LongA = -2.977982
chairArray[64].LatB = 56.460085
chairArray[64].LongB = -2.977990
chairArray[64].LatC = 56.460080
chairArray[64].LongC = -2.977988
chairArray[64].LatD = 56.460081
chairArray[64].LongD = -2.977980

chairArray[65].ID = 66
chairArray[65].Occupied = False
chairArray[65].RecentlyOccupied = False
chairArray[65].LatA = 56.460077
chairArray[65].LongA = -2.977979
chairArray[65].LatB = 56.460076
chairArray[65].LongB = -2.977987
chairArray[65].LatC = 56.460071
chairArray[65].LongC = -2.977985
chairArray[65].LatD = 56.460072
chairArray[65].LongD = -2.977977
'''
------------------------------
LOOP FOR OCCUPYING CHAIRS AT RANDOM
------------------------------
'''
import datetime
import json
count = 0;
currenttime = datetime.datetime(2018,9,1,9,00,00)
openingtime = datetime.time(9)
closingtime = datetime.time(18)
timeJump = datetime.timedelta(0,1800)
data = {}
data['CHAIR_INFO'] = []
data['CHAIR_CO_ORDS'] = []
for x in range(163):
    #check if restaurant is open
    if currenttime.time() >= openingtime and currenttime.time() <= closingtime:
        print ("------------------------------")
        print ("------------------------------")
        print ("------------------------------")
        print ("------------------------------")
        print("NEW ITERATION - TimeStamp: %s" %(currenttime,))
        currtimeStr = '%s' %(currenttime,)
        for i in range(65):
            print("-------")
            from random import randint
            chance = randint(0,100)
            if chairArray[i].Occupied is True:
                if chance < chairArray[i].leaveChance:
                    chairArray[i].Occupied = False
                    chairArray[i].RecentlyOccupied = True
                    chairArray[i].leaveChance = 55
                else:
                    chairArray[i].leaveChance += 5
            else:
                if chance < 55:
                    chairArray[i].Occupied = True
                    chairArray[i].UniqueOccupants += 1
                if chairArray[i].RecentlyOccupied is True:
                    chairArray[i].RecentlyOccupied = False
            print("Chair ID: %i" %(chairArray[i].ID,))
            print("Occupation Status: %s" %(chairArray[i].Occupied,))
            print("Unique Occupants: %i" %(chairArray[i].UniqueOccupants,))
            print("Recently Occupied: %s" %(chairArray[i].RecentlyOccupied,))
            count += 1
            chairCoordinates = [[chairArray[i].LatA, chairArray[i].LongA],[chairArray[i].LatB,chairArray[i].LongB],[chairArray[i].LatC,chairArray[i].LongC],[chairArray[i].LatD,chairArray[i].LongD]]
            data['CHAIR_INFO'].append({'id': count,'TimeStamp' : currtimeStr, 'ChairID' : chairArray[i].ID,'TableID' : chairArray[i].tableID, 'Occupied' : chairArray[i].Occupied, 'RecentlyOccupied' : chairArray[i].RecentlyOccupied, 'UniqueOccupants' : chairArray[i].UniqueOccupants, 'Coordinates' : chairCoordinates ,})
    else:
        print("%s - Restaurant Closed" %(currenttime.time(),))
        #Restaurant is closed between 6pm and 9am so reset all seat status's
        for i in range(65):
            chairArray[i].Occupied = False
            chairArray[i].RecentlyOccupied = False
            chairArray[i].leaveChance = 55
    currenttime += timeJump
with open('data.txt', 'w') as outfile:
    json.dump(data, outfile)
