import React, { useState, useEffect } from 'react';
import { ShoppingCart, X, Plus, Minus, MapPin, Phone, Mail, Clock, Wrench, Trophy, ArrowRight, Car, Zap, Box, Package, Check, Menu, ChevronRight, Flag, Award, Search, Share2, ArrowUpDown, Cookie, Shield, FileText, Truck, ShieldCheck, Lock, LogOut, Edit3, Trash2, Save, Eye, EyeOff, BarChart3, ClipboardList, AlertCircle } from 'lucide-react';

const C = {
  blue: '#1e3a8a', blueDark: '#0f1f5c', blueMid: '#1e40af', blueLight: '#3b5bc7',
  red: '#dc2626', redBright: '#ef4444', redDark: '#991b1b',
  silver: '#e2e8f0', cream: '#f8fafc', charcoal: '#0f172a', gray: '#475569',
};

const CATS = [
  { id: 'all', label: 'All Parts', Icon: Package },
  { id: 'cobra', label: 'Cobra Parts', Icon: Car },
  { id: 'mustang', label: 'Mustang Parts', Icon: Wrench },
  { id: 'crate', label: 'Crate Motors', Icon: Zap },
  { id: 'blocks', label: 'Blocks & Heads', Icon: Box },
  { id: 'memorabilia', label: 'Memorabilia', Icon: Trophy },
];

const SUBS = [
  { id: 'all', label: 'All' },
  { id: 'engine', label: 'Engine' },
  { id: 'interior', label: 'Interior' },
  { id: 'suspension', label: 'Suspension' },
  { id: 'brakes', label: 'Brakes' },
  { id: 'body', label: 'Body & Exterior' },
  { id: 'electrical', label: 'Electrical' },
  { id: 'drivetrain', label: 'Drivetrain' },
];

const INITIAL_PARTS = [
  { id: 'c-e1', cat: 'cobra', sub: 'engine', name: 'CSX3000 Finned Aluminum Valve Covers', price: 895, stock: 4, desc: 'Period-correct finned aluminum valve covers for 427 FE Cobra engines. Polished finish, CSX3000 pattern.', specs: ['Fits: 427 FE Side Oiler', 'Cast Aluminum', 'Polished finish', 'Pair (L+R)'] },
  { id: 'c-e2', cat: 'cobra', sub: 'engine', name: '427 Side Oiler Aluminum Oil Pan', price: 1250, stock: 2, desc: 'Road-racing oil pan for 427 FE side oiler. 7qt capacity, windage tray, baffled trap doors.', specs: ['7qt capacity', 'Windage tray', 'Baffled trap doors', 'Fits 1965-67 427 FE'] },
  { id: 'c-e3', cat: 'cobra', sub: 'engine', name: 'Weber IDA 48mm Carburetor Set', price: 4850, stock: 1, desc: 'Set of four 48 IDA Weber carburetors with intake manifold for 427 FE. The induction of choice for GT40 and Competition Cobras.', specs: ['48mm IDA Webers (4)', 'Includes intake manifold', 'Linkage kit', 'Dyno-tuned'] },
  { id: 'c-i1', cat: 'cobra', sub: 'interior', name: 'Smiths Gauge Cluster — 5 Piece Set', price: 2150, stock: 3, desc: 'Reproduction Smiths 5-gauge set: speedometer, tach, oil, water, fuel. Correct faces and green-glow lighting.', specs: ['Speedo, tach, oil, water, fuel', 'Smiths-pattern faces', 'Green-glow lighting', '160mph / 8000rpm'] },
  { id: 'c-i2', cat: 'cobra', sub: 'interior', name: 'Leather Bucket Seat Pair — Black', price: 2895, stock: 2, desc: 'Correct-pattern CSX Cobra bucket seats. Black leather on fiberglass shells, horsehair padding.', specs: ['Black leather', 'Fiberglass shell', 'Horsehair pad', 'Pair'] },
  { id: 'c-i3', cat: 'cobra', sub: 'interior', name: 'Aluminum Dash Panel — Blank', price: 485, stock: 6, desc: 'Brushed aluminum dash blank for CSX-style builds. Pre-punched for Smiths cluster.', specs: ['Brushed aluminum', 'Pre-punched option', '16ga thickness', 'Fits CSX chassis'] },
  { id: 'c-s1', cat: 'cobra', sub: 'suspension', name: 'Tubular Upper A-Arm Set', price: 1395, stock: 3, desc: 'Chromoly tubular upper A-arms for CSX chassis. Heim-jointed for alignment adjustability.', specs: ['Chromoly tubing', 'Heim-jointed', 'Pair', 'Powdercoat black'] },
  { id: 'c-s2', cat: 'cobra', sub: 'suspension', name: 'Koni Adjustable Shock Set', price: 985, stock: 4, desc: 'Koni adjustable-damping shocks, all four corners. Valved for Cobra weight and wheelbase.', specs: ['Adjustable rebound', 'Set of 4', 'Koni Classic Red', 'Cobra-specific valving'] },
  { id: 'c-s3', cat: 'cobra', sub: 'suspension', name: '7/8" Front Sway Bar Kit', price: 625, stock: 5, desc: 'Front anti-roll bar upgrade. 7/8" solid bar with polyurethane bushings and adjustable end links.', specs: ['7/8" solid bar', 'Poly bushings', 'Adjustable end links', 'Bolt-in'] },
  { id: 'c-b1', cat: 'cobra', sub: 'brakes', name: 'Girling Front Brake Caliper Set', price: 1875, stock: 3, desc: 'Reproduction Girling 4-piston front calipers as fitted to CSX2000/3000 Cobras. Rebuilt to factory spec.', specs: ['4-piston design', 'Pair (L+R)', 'New seals & pistons', 'CSX2000-3000 spec'] },
  { id: 'c-b2', cat: 'cobra', sub: 'brakes', name: 'Drilled & Vented Rotor Set — 4 Wheel', price: 895, stock: 4, desc: 'Cross-drilled and vented rotor set for all four corners. Better heat dissipation than solid originals.', specs: ['Set of 4 rotors', 'Cross-drilled', 'Vented construction', 'Direct fit CSX'] },
  { id: 'c-b3', cat: 'cobra', sub: 'brakes', name: 'Stainless Braided Brake Line Kit', price: 345, stock: 8, desc: 'Full braided stainless brake line kit, all four corners. Firmer pedal and DOT-legal.', specs: ['Full 4-wheel kit', 'Stainless braided', 'DOT-legal', 'AN fittings'] },
  { id: 'c-bo1', cat: 'cobra', sub: 'body', name: 'Raydyot Bullet Mirrors (Pair)', price: 425, stock: 8, desc: 'Classic Raydyot-style chrome bullet mirrors. The exact mirror specified by Shelby American for CSX Cobras.', specs: ['Chrome-plated brass', 'Universal mount', 'Pair', 'Period-correct pattern'] },
  { id: 'c-bo2', cat: 'cobra', sub: 'body', name: 'Aluminum Hood Pin Kit', price: 185, stock: 12, desc: 'Polished aluminum hood pins with lanyards. Correct racing-style hood retention.', specs: ['Polished aluminum', 'Steel lanyards', 'Pair with hardware', 'CSX spec'] },
  { id: 'c-bo3', cat: 'cobra', sub: 'body', name: 'Chrome Side Exhaust Heat Shields', price: 685, stock: 6, desc: 'Chrome-plated side exhaust heat shields. Polished finish, correct bolt pattern.', specs: ['Chrome plated', 'Pair (L+R)', 'Drilled pattern', 'Bolt-on'] },
  { id: 'c-el1', cat: 'cobra', sub: 'electrical', name: 'Complete Wiring Harness — CSX Pattern', price: 1195, stock: 4, desc: 'Full wiring harness built to CSX Cobra factory pattern. Correct colors, connectors, and routing.', specs: ['CSX-pattern routing', 'Color-correct wiring', 'Labeled circuits', 'Lifetime warranty'] },
  { id: 'c-el2', cat: 'cobra', sub: 'electrical', name: 'LED-Compatible Electronic Flasher Relay', price: 45, stock: 20, desc: 'Drop-in replacement for original thermal flasher. Compatible with LED bulbs — no more hyper-flash.', specs: ['LED compatible', 'No load resistors needed', '2-pin plug', '12V'] },
  { id: 'c-el3', cat: 'cobra', sub: 'electrical', name: 'Period-Style Ignition Coil', price: 125, stock: 10, desc: 'Black canister ignition coil styled to match original CSX components. Modern internals.', specs: ['40,000V output', 'Period appearance', 'Oil-filled', '12V'] },
  { id: 'c-d1', cat: 'cobra', sub: 'drivetrain', name: 'Top-Loader 4-Speed Rebuild Kit', price: 895, stock: 5, desc: 'Complete rebuild kit for Ford Top-Loader 4-speed. Bearings, synchros, seals, gaskets.', specs: ['All bearings & synchros', 'Seals & gaskets', 'Fits HEH/RUG Top-Loaders', 'Instructions included'] },
  { id: 'c-d2', cat: 'cobra', sub: 'drivetrain', name: 'Salisbury 4HU Differential — Rebuilt', price: 4250, stock: 1, desc: 'Fully rebuilt Salisbury 4HU differential as fitted to original 427 Cobras. 3.54:1 ratio.', specs: ['3.54:1 ratio', 'Limited-slip', 'Fully rebuilt', 'Salisbury 4HU spec'] },
  { id: 'm-e1', cat: 'mustang', sub: 'engine', name: 'Shelby GT350 Tri-Y Exhaust Headers', price: 1495, stock: 4, desc: 'Reproduction Tri-Y headers as fitted to 1965-66 GT350. Ceramic-coated 1 5/8" primaries.', specs: ['1 5/8" primaries', '3" collector', 'Ceramic coated', 'Fits 65-66 GT350 / 65-68 Mustang'] },
  { id: 'm-e2', cat: 'mustang', sub: 'engine', name: 'Holley 715 CFM Center-Pivot Carburetor', price: 895, stock: 3, desc: 'Reproduction 715 CFM center-pivot Holley used on original 427 Cobras and Shelby GT500s.', specs: ['715 CFM', 'Center-pivot design', 'Mechanical secondaries', 'Fresh rebuild'] },
  { id: 'm-e3', cat: 'mustang', sub: 'engine', name: 'Cobra Hi-Rise Aluminum Intake', price: 785, stock: 5, desc: 'Shelby Cobra Hi-Rise single-plane aluminum intake manifold for 289/302.', specs: ['Single-plane', 'Aluminum cast', 'Fits 289/302', 'Cobra-script logo'] },
  { id: 'm-i1', cat: 'mustang', sub: 'interior', name: 'Wood-Rim Steering Wheel 15"', price: 625, stock: 7, desc: 'Classic wood-rim steering wheel with polished aluminum spokes.', specs: ['15" diameter', 'Solid wood rim', 'Polished aluminum spokes', 'Adapter included'] },
  { id: 'm-i2', cat: 'mustang', sub: 'interior', name: 'GT350 Rally Gauge Cluster', price: 985, stock: 4, desc: 'Reproduction GT350 rally-pack gauge cluster — 8k tach, oil pressure, amp gauge.', specs: ['8,000 rpm tach', 'Oil pressure + amp', 'Fits 65-66 Mustang', 'Bolt-in'] },
  { id: 'm-i3', cat: 'mustang', sub: 'interior', name: 'Shelby Embossed Floor Mat Set', price: 225, stock: 10, desc: 'Black rubber floor mats with embossed Shelby cobra logo. Front pair.', specs: ['Black rubber', 'Embossed cobra logo', 'Front pair', 'Fits 65-70'] },
  { id: 'm-s1', cat: 'mustang', sub: 'suspension', name: 'Shelby-Spec Front Coil Spring Set', price: 295, stock: 8, desc: 'Lowered and stiffened front coil springs to GT350 specification. 1" drop, progressive rate.', specs: ['1" lower than stock', 'Progressive rate', 'GT350 spec', 'Pair'] },
  { id: 'm-s2', cat: 'mustang', sub: 'suspension', name: '1" Front Sway Bar — GT350 Style', price: 385, stock: 6, desc: '1-inch front anti-roll bar sized to GT350 specification. Polyurethane bushings.', specs: ['1" solid bar', 'Poly bushings', 'Adjustable end links', 'Bolt-in'] },
  { id: 'm-s3', cat: 'mustang', sub: 'suspension', name: 'Export Brace & Monte Carlo Bar Kit', price: 445, stock: 5, desc: 'Shelby export brace and Monte Carlo bar combo. Tightens shock-tower flex.', specs: ['Export brace', 'Monte Carlo bar', 'Powdercoat black', 'Hardware included'] },
  { id: 'm-b1', cat: 'mustang', sub: 'brakes', name: 'Front Disc Brake Conversion Kit', price: 1285, stock: 4, desc: 'Complete front disc brake conversion for 65-68 Mustang drum cars.', specs: ['Complete bolt-on kit', 'Rotors, calipers, brackets', 'Dual master cylinder', '5-lug pattern'] },
  { id: 'm-b2', cat: 'mustang', sub: 'brakes', name: 'Kelsey-Hayes 4-Piston Caliper Rebuild', price: 485, stock: 5, desc: 'Rebuild service for original Kelsey-Hayes 4-piston calipers. Core exchange.', specs: ['Core exchange', 'New pistons + seals', 'Zinc-plated finish', 'Pair'] },
  { id: 'm-bo1', cat: 'mustang', sub: 'body', name: 'GT350 Fiberglass Hood — Scooped', price: 985, stock: 3, desc: 'GT350-style fiberglass hood with functional scoop. Sanded and ready for paint.', specs: ['Fiberglass', 'Functional scoop', 'Ready for paint', 'Fits 65-66'] },
  { id: 'm-bo2', cat: 'mustang', sub: 'body', name: 'Shelby Le Mans Stripe Kit', price: 285, stock: 15, desc: 'Full over-the-top Le Mans racing stripe kit. Choose width and color. 3M vinyl.', specs: ['3M vinyl', 'Pre-cut', 'Multiple widths', 'Black / white / blue'] },
  { id: 'm-bo3', cat: 'mustang', sub: 'body', name: 'Fiberglass Rear Quarter Scoops', price: 385, stock: 6, desc: 'Reproduction GT350/GT500 fiberglass quarter scoops. Primed and ready for paint.', specs: ['Fiberglass', 'Primed', 'Fits 65-66 fastback', 'Pair'] },
  { id: 'm-el1', cat: 'mustang', sub: 'electrical', name: '65-68 Mustang Complete Wiring Harness', price: 785, stock: 4, desc: 'Full replacement wiring harness for 1965-68 Mustangs. Correct colors and connectors.', specs: ['Full vehicle harness', 'Color-correct', 'Labeled circuits', 'Fits 65-68'] },
  { id: 'm-el2', cat: 'mustang', sub: 'electrical', name: 'Pertronix Ignitor Electronic Ignition', price: 165, stock: 15, desc: 'Hidden electronic ignition conversion — drops into your original distributor.', specs: ['Hidden install', 'Fits most Ford dizzys', 'No maintenance', '12V'] },
  { id: 'm-d1', cat: 'mustang', sub: 'drivetrain', name: 'Tremec TKX 5-Speed Conversion', price: 3850, stock: 2, desc: 'Modern Tremec TKX 5-speed conversion kit for 65-70 Mustang. Bellhousing and clutch included.', specs: ['5-speed with OD', 'Bellhousing + clutch', 'Period shifter position', 'Fits 289/302/351W'] },
  { id: 'm-d2', cat: 'mustang', sub: 'drivetrain', name: '9" Rear End — Fully Built', price: 2895, stock: 3, desc: 'Built Ford 9" rearend with 31-spline axles, Traction-Lok, and 3.50:1 gears.', specs: ['31-spline axles', 'Traction-Lok', '3.50:1 gears', 'Drum or disc spec'] },
  { id: 'cr1', cat: 'crate', sub: 'engine', name: 'Shelby 427 FE All-Aluminum Crate — 550hp', price: 38500, stock: 1, desc: 'Hand-built 427ci FE all-aluminum crate. Shelby Engine Co. built in Windsor, CA. Dyno-tested.', specs: ['427ci / 550hp', 'All-aluminum', 'Medium-riser heads', 'Dyno sheet included'] },
  { id: 'cr2', cat: 'crate', sub: 'engine', name: 'Shelby 289 FIA All-Aluminum Crate — 385hp', price: 28900, stock: 2, desc: 'FIA-spec 289 all-aluminum crate. Correct for CSX2000 Cobra replicas and GT350 tributes.', specs: ['289ci / 385hp', 'Solid-lifter cam', 'FIA-spec internals', 'Dual-quad optional'] },
  { id: 'cr3', cat: 'crate', sub: 'engine', name: '351 Windsor Stroker 427ci — 510hp', price: 24500, stock: 3, desc: '351 Windsor stroked to 427ci. Forged rotating assembly, aluminum heads.', specs: ['427ci stroked / 510hp', 'Forged crank & rods', 'Aluminum heads', '500 lb-ft'] },
  { id: 'bh1', cat: 'blocks', sub: 'engine', name: 'Shelby 427 FE Bare Aluminum Block', price: 9118, stock: 5, desc: 'Bare aluminum 427 FE block cast from Shelby Engine Co. tooling. Fully machined.', specs: ['A356 Aluminum', 'Side oiler', 'Steel main caps', 'Fully machined'] },
  { id: 'bh2', cat: 'blocks', sub: 'engine', name: 'FE Medium-Riser Aluminum Heads (Pair)', price: 4850, stock: 4, desc: 'Medium-riser aluminum cylinder heads for FE builds. CNC-ported, flow-matched pairs.', specs: ['CNC-ported', 'Flow-matched pair', '2.09/1.65 valves', 'Medium-riser pattern'] },
  { id: 'bh3', cat: 'blocks', sub: 'engine', name: '289 Hi-Po Aluminum Cylinder Heads (Pair)', price: 3200, stock: 6, desc: 'High-performance aluminum heads for 289/302. Hardened seats for unleaded fuel.', specs: ['1.94/1.60 valves', 'Screw-in studs', 'Hardened seats', 'Pair'] },
  { id: 'mem1', cat: 'memorabilia', sub: null, name: 'Shelby American Registry — Signed Edition', price: 485, stock: 6, desc: 'Official SAAC Registry, signed edition. Complete production records for every CSX-series Cobra.', specs: ['Hardcover', 'Signed edition', 'Full CSX records', 'SAAC certified'] },
  { id: 'mem2', cat: 'memorabilia', sub: null, name: 'Carroll Shelby Autographed Photo 11x14', price: 785, stock: 2, desc: 'Authentic Carroll Shelby autographed 11x14 photograph. Signed during Shelby\'s lifetime.', specs: ['11x14 print', 'Authentic signature', 'COA included', 'Verified'] },
  { id: 'mem3', cat: 'memorabilia', sub: null, name: 'CSX-Series Grille Badge', price: 165, stock: 12, desc: 'Enamel grille badge commemorating the CSX Cobra series. Cloisonné enamel on brass.', specs: ['Enamel on brass', 'Chrome bezel', '3" diameter', 'Universal mount'] },
];

const INITIAL_CARS = [
  { id: 'c1', name: '2019 Shelby CSX4000 Cobra', price: 189500, year: 2019, tagline: '427 FE / 4-speed / 2,400 miles', desc: 'Pristine CSX4000 Cobra delivered new by DenBeste Motorsports in 2019. Viper Blue with white LeMans stripes. 427 FE side oiler, top-loader 4-speed, Halibrand-style wheels. Documented with full SAAC paperwork.', specs: ['Engine: 427 FE Side Oiler', 'Trans: Top-Loader 4-speed', 'Mileage: 2,400', 'Color: Viper Blue / White Stripes', 'VIN: CSX4XXX', 'Wheels: Halibrand-style 15"'] },
  { id: 'c2', name: '2021 Shelby CSX8000 Daytona Coupe', price: 425000, year: 2021, tagline: 'Continuation Daytona Coupe / 427ci / Roush-built', desc: 'CSX8000-series Daytona Coupe continuation car. One of a limited production run built with Carroll Shelby Licensing approval. Guardsman Blue over red interior. Show-quality, SAAC event-eligible.', specs: ['Engine: 427ci Roush-built', 'Trans: Tremec 5-speed', 'Mileage: 850', 'Color: Guardsman Blue', 'VIN: CSX8XXX', 'Interior: Red Leather'] },
  { id: 'c3', name: '2018 CS GT40 MkII', price: 295000, year: 2018, tagline: 'GT40 MkII continuation / 427 FE / Period-correct', desc: 'CS GT40 MkII continuation by Superformance through DenBeste Motorsports. Gulf livery, 427 FE with Weber induction. Fully sorted, track-ready, street-legal.', specs: ['Engine: 427 FE with Webers', 'Trans: ZF 5-speed', 'Mileage: 1,200', 'Livery: Gulf Blue/Orange', 'Chassis: GT40P-XXXX', 'Street legal'] },
  { id: 'c4', name: '2020 Shelby CSX7000 Cobra', price: 225000, year: 2020, tagline: '427 Competition-spec / Wide-body / Race-ready', desc: 'CSX7000 Competition-spec Cobra. Wide-body aluminum coachwork, FIA roll bar, fuel cell, quick-jack points. Built for vintage racing, delivered street-legal. Under 500 miles.', specs: ['Engine: 427 FE Competition', 'Trans: Jerico 4-speed', 'Mileage: 480', 'Color: Black / Silver stripes', 'VIN: CSX7XXX', 'FIA roll cage'] },
];

const INITIAL_ORDERS = [
  { id: 'DBM-20260422-0018', customer: 'Michael Garcia', email: 'mgarcia@email.com', items: 'CSX3000 Valve Covers, Raydyot Mirrors', total: 1320, status: 'shipped', date: '2026-04-22' },
  { id: 'DBM-20260421-0017', customer: 'Robert Chen', email: 'rchen@email.com', items: 'Shelby 427 FE Crate Motor — 550hp', total: 38500, status: 'processing', date: '2026-04-21' },
  { id: 'DBM-20260421-0016', customer: 'David Thompson', email: 'dthompson@email.com', items: 'Tremec TKX 5-Speed Conversion', total: 3850, status: 'processing', date: '2026-04-21' },
  { id: 'DBM-20260420-0015', customer: 'James Patterson', email: 'jpatterson@email.com', items: 'Girling Brake Calipers, Braided Line Kit, Koni Shocks', total: 3205, status: 'shipped', date: '2026-04-20' },
  { id: 'DBM-20260419-0014', customer: 'Thomas Walker', email: 'twalker@email.com', items: 'Shelby 427 FE Bare Aluminum Block', total: 9118, status: 'delivered', date: '2026-04-19' },
  { id: 'DBM-20260418-0013', customer: 'Andrew Foster', email: 'afoster@email.com', items: 'GT350 Tri-Y Headers, Holley 715 CFM', total: 2390, status: 'delivered', date: '2026-04-18' },
  { id: 'DBM-20260417-0012', customer: 'Christopher Lee', email: 'clee@email.com', items: 'Carroll Shelby Autographed Photo', total: 785, status: 'delivered', date: '2026-04-17' },
];

const ZIP_DIST = {
  '00': 3050, '01': 2900, '02': 2900, '03': 2950, '04': 3000, '05': 2950, '06': 2850, '07': 2800, '08': 2800, '09': 2800,
  '10': 2800, '11': 2800, '12': 2750, '13': 2700, '14': 2600, '15': 2500, '16': 2450, '17': 2600, '18': 2700, '19': 2750,
  '20': 2700, '21': 2700, '22': 2700, '23': 2750, '24': 2650, '25': 2550, '26': 2550, '27': 2700, '28': 2600, '29': 2700,
  '30': 2450, '31': 2550, '32': 2700, '33': 2900, '34': 2850, '35': 2350, '36': 2450, '37': 2350, '38': 2250, '39': 2300,
  '40': 2200, '41': 2250, '42': 2150, '43': 2400, '44': 2450, '45': 2350, '46': 2300, '47': 2200, '48': 2400, '49': 2500,
  '50': 1800, '51': 1750, '52': 1950, '53': 2150, '54': 2200, '55': 1950, '56': 1850, '57': 1500, '58': 1650, '59': 1050,
  '60': 2150, '61': 2050, '62': 2100, '63': 1950, '64': 1750, '65': 1900, '66': 1600, '67': 1550, '68': 1600, '69': 1400,
  '70': 2100, '71': 2000, '72': 2000, '73': 1600, '74': 1700, '75': 1750, '76': 1700, '77': 1950, '78': 1900, '79': 1400,
  '80': 1250, '81': 1250, '82': 1100, '83': 750, '84': 700, '85': 750, '86': 650, '87': 1150, '88': 1200, '89': 250,
  '90': 450, '91': 420, '92': 550, '93': 300, '94': 70, '95': 100, '96': 250, '97': 550, '98': 800, '99': 1200,
};

function getZipDistance(zip) {
  if (!zip || zip.length !== 5 || !/^\d{5}$/.test(zip)) return null;
  if (zip.startsWith('954') || zip.startsWith('955')) return 25;
  if (['940','941','944','945','946','947','948','949','950'].includes(zip.substring(0,3))) return 75;
  return ZIP_DIST[zip.substring(0,2)] || 2500;
}

function calcShippingQuote(distance) {
  let oB=450,oM=0.65,eB=650,eM=1.05;
  if(distance<300){oM*=1.35;eM*=1.40;} else if(distance>1500){oM*=0.85;eM*=0.92;}
  const open=Math.round((oB+distance*oM)/25)*25;
  const enclosed=Math.round((eB+distance*eM)/25)*25;
  const openDays=distance<300?'1–3':distance<1000?'3–5':distance<2000?'5–8':'7–10';
  const encDays=distance<300?'1–2':distance<1000?'2–5':distance<2000?'4–7':'6–9';
  return {distance,open,enclosed,openDays,encDays};
}

const fmt = (n) => '$' + (n || 0).toLocaleString('en-US');

const ADMIN_EMAIL = 'admin@denbestemotorsports.com';
const ADMIN_PASSWORD = 'cobra427';

function Logo({ size = 'md' }) {
  const scale = size === 'sm' ? 0.75 : size === 'lg' ? 1.6 : 1;
  return (
    <div className="flex flex-col items-center select-none" style={{ transform: `scale(${scale})`, transformOrigin: 'center' }}>
      <div className="font-black tracking-widest leading-none" style={{ fontSize: '1.75rem', fontFamily: 'Impact, "Arial Black", sans-serif', background: 'linear-gradient(180deg, #f1f5f9 0%, #cbd5e1 40%, #64748b 55%, #f1f5f9 100%)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', WebkitTextStroke: '1.5px #000', filter: 'drop-shadow(2px 2px 0 rgba(0,0,0,0.4))', letterSpacing: '0.08em' }}>
        DENBESTE
      </div>
      <div className="px-4 py-0.5 -mt-1 rounded-full" style={{ background: `linear-gradient(180deg, ${C.blueLight} 0%, ${C.blueDark} 100%)`, border: '2px solid #94a3b8', boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.3), 0 2px 4px rgba(0,0,0,0.3)' }}>
        <span className="italic font-black tracking-wider" style={{ fontSize: '0.85rem', color: C.redBright, textShadow: `1px 1px 0 ${C.redDark}, 0 0 1px #000`, fontFamily: 'Impact, sans-serif' }}>
          MOTORSPORTS
        </span>
      </div>
    </div>
  );
}

function PartIcon({ cat }) {
  const map = { cobra: Car, crate: Zap, blocks: Box, mustang: Wrench, memorabilia: Trophy };
  const Icon = map[cat] || Package;
  const gradients = {
    cobra: `linear-gradient(135deg, ${C.blueDark}, ${C.blueMid})`,
    crate: `linear-gradient(135deg, ${C.redDark}, ${C.red})`,
    blocks: `linear-gradient(135deg, ${C.charcoal}, ${C.gray})`,
    mustang: `linear-gradient(135deg, ${C.blueMid}, ${C.redBright})`,
    memorabilia: `linear-gradient(135deg, #78350f, #d97706)`,
  };
  return (
    <div className="w-full h-full flex items-center justify-center" style={{ background: gradients[cat] || gradients.cobra }}>
      <Icon size={72} color="white" strokeWidth={1.2} style={{ opacity: 0.95, filter: 'drop-shadow(0 2px 6px rgba(0,0,0,0.4))' }} />
    </div>
  );
}

function CarIllustration({ idx }) {
  const grads = [
    `linear-gradient(135deg, ${C.blueDark}, ${C.blueMid}, ${C.blueLight})`,
    `linear-gradient(135deg, ${C.charcoal}, ${C.blue}, ${C.blueMid})`,
    `linear-gradient(135deg, #0c4a6e, #0369a1, #f59e0b)`,
    `linear-gradient(135deg, ${C.charcoal}, ${C.gray}, ${C.silver})`,
  ];
  return (
    <div className="w-full h-full flex items-center justify-center relative overflow-hidden" style={{ background: grads[idx % grads.length] }}>
      <div className="absolute inset-0 opacity-10" style={{ backgroundImage: 'repeating-linear-gradient(45deg, transparent, transparent 20px, rgba(255,255,255,0.1) 20px, rgba(255,255,255,0.1) 21px)' }} />
      <Car size={120} color="white" strokeWidth={1} style={{ filter: 'drop-shadow(0 4px 12px rgba(0,0,0,0.5))' }} />
    </div>
  );
}

export default function App() {
  // Site data — editable from admin
  const [parts, setParts] = useState(INITIAL_PARTS);
  const [cars, setCars] = useState(INITIAL_CARS);
  const [orders, setOrders] = useState(INITIAL_ORDERS);

  // Auth + admin
  const [isAdmin, setIsAdmin] = useState(false);
  const [loginOpen, setLoginOpen] = useState(false);
  const [loginEmail, setLoginEmail] = useState('');
  const [loginPass, setLoginPass] = useState('');
  const [showPass, setShowPass] = useState(false);
  const [loginError, setLoginError] = useState('');
  const [adminTab, setAdminTab] = useState('dashboard');
  const [partEdit, setPartEdit] = useState(null); // null | 'new' | part object
  const [carEdit, setCarEdit] = useState(null);
  const [adminSearch, setAdminSearch] = useState('');
  const [loaded, setLoaded] = useState(false);

  // Storefront state
  const [cart, setCart] = useState([]);
  const [category, setCategory] = useState('all');
  const [subcategory, setSubcategory] = useState('all');
  const [productModal, setProductModal] = useState(null);
  const [carModal, setCarModal] = useState(null);
  const [cartOpen, setCartOpen] = useState(false);
  const [checkoutOpen, setCheckoutOpen] = useState(false);
  const [orderDone, setOrderDone] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [inquiryCar, setInquiryCar] = useState(null);
  const [inquirySent, setInquirySent] = useState(false);
  const [partSearch, setPartSearch] = useState('');
  const [partSort, setPartSort] = useState('featured');
  const [carSearch, setCarSearch] = useState('');
  const [carSort, setCarSort] = useState('featured');
  const [toast, setToast] = useState('');
  const [showCookieBanner, setShowCookieBanner] = useState(true);
  const [privacyOpen, setPrivacyOpen] = useState(false);
  const [cookiesOpen, setCookiesOpen] = useState(false);
  const [termsOpen, setTermsOpen] = useState(false);
  const [shipCarId, setShipCarId] = useState('');
  const [shipZip, setShipZip] = useState('');
  const [shipQuote, setShipQuote] = useState(null);
  const [shipError, setShipError] = useState('');
  const [imgErrors, setImgErrors] = useState({});
  const [lightbox, setLightbox] = useState(null);

  // Load persisted data on mount
  useEffect(() => {
    const load = async () => {
      try {
        if (typeof window !== 'undefined' && window.storage) {
          const p = await window.storage.get('dbm:parts').catch(() => null);
          if (p?.value) { try { setParts(JSON.parse(p.value)); } catch {} }
          const c = await window.storage.get('dbm:cars').catch(() => null);
          if (c?.value) { try { setCars(JSON.parse(c.value)); } catch {} }
          const o = await window.storage.get('dbm:orders').catch(() => null);
          if (o?.value) { try { setOrders(JSON.parse(o.value)); } catch {} }
          const s = await window.storage.get('dbm:session').catch(() => null);
          if (s?.value === 'admin') setIsAdmin(true);
          const cb = await window.storage.get('dbm:cookies').catch(() => null);
          if (cb?.value) setShowCookieBanner(false);
        }
      } catch {}
      setLoaded(true);
    };
    load();
  }, []);

  const persist = async (key, val) => {
    try {
      if (typeof window !== 'undefined' && window.storage) {
        await window.storage.set(key, typeof val === 'string' ? val : JSON.stringify(val));
      }
    } catch {}
  };

  const updateParts = (newParts) => { setParts(newParts); persist('dbm:parts', newParts); };
  const updateCars = (newCars) => { setCars(newCars); persist('dbm:cars', newCars); };
  const updateOrders = (newOrders) => { setOrders(newOrders); persist('dbm:orders', newOrders); };

  const doLogin = () => {
    if (loginEmail.trim().toLowerCase() === ADMIN_EMAIL && loginPass === ADMIN_PASSWORD) {
      setIsAdmin(true);
      setLoginOpen(false);
      setLoginEmail(''); setLoginPass(''); setLoginError('');
      persist('dbm:session', 'admin');
      showToast('Signed in as admin');
    } else {
      setLoginError('Invalid email or password');
    }
  };

  const doLogout = () => {
    setIsAdmin(false);
    setAdminTab('dashboard');
    persist('dbm:session', '');
    showToast('Signed out');
  };

  const resetDemoData = () => {
    updateParts(INITIAL_PARTS);
    updateCars(INITIAL_CARS);
    updateOrders(INITIAL_ORDERS);
    showToast('Demo data restored');
  };

  const savePart = (p) => {
    if (p.id.startsWith('new-')) {
      const newP = { ...p, id: 'custom-' + Date.now() };
      updateParts([newP, ...parts]);
      showToast('Part added');
    } else {
      updateParts(parts.map(x => x.id === p.id ? p : x));
      showToast('Part updated');
    }
    setPartEdit(null);
  };

  const deletePart = (id) => {
    updateParts(parts.filter(p => p.id !== id));
    showToast('Part deleted');
  };

  const saveCar = (c) => {
    if (c.id.startsWith('new-')) {
      const newC = { ...c, id: 'custom-' + Date.now() };
      updateCars([newC, ...cars]);
      showToast('Car added');
    } else {
      updateCars(cars.map(x => x.id === c.id ? c : x));
      showToast('Car updated');
    }
    setCarEdit(null);
  };

  const deleteCar = (id) => {
    updateCars(cars.filter(c => c.id !== id));
    showToast('Car deleted');
  };

  const updateOrderStatus = (id, status) => {
    updateOrders(orders.map(o => o.id === id ? { ...o, status } : o));
    showToast('Order updated');
  };

  // Storefront helpers
  const addToCart = (p) => {
    setCart((prev) => {
      const ex = prev.find(i => i.id === p.id);
      if (ex) return prev.map(i => i.id === p.id ? { ...i, qty: i.qty + 1 } : i);
      return [...prev, { ...p, qty: 1 }];
    });
  };
  const removeFromCart = (id) => setCart(p => p.filter(i => i.id !== id));
  const changeQty = (id, d) => setCart(p => p.map(i => i.id === id ? { ...i, qty: Math.max(1, i.qty + d) } : i));
  const cartCount = cart.reduce((s, i) => s + i.qty, 0);
  const cartTotal = cart.reduce((s, i) => s + i.price * i.qty, 0);

  const share = (item, kind) => {
    const slug = (item.name || '').toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
    const url = `https://denbestemotorsports.com/${kind}/${slug}`;
    if (typeof navigator !== 'undefined' && navigator.share) {
      navigator.share({ title: item.name, text: `${item.name} — DenBeste Motorsports`, url }).catch(() => copy(url));
    } else copy(url);
  };
  const copy = (t) => { try { navigator.clipboard?.writeText(t).then(() => showToast('Link copied'), () => showToast('Link: ' + t)); } catch { showToast('Link: ' + t); } };
  const showToast = (msg) => { setToast(msg); setTimeout(() => setToast(''), 2400); };

  const showSubs = category === 'cobra' || category === 'mustang';
  const activeSub = showSubs ? subcategory : 'all';
  const filtered = parts.filter(p => {
    if (p.listed === false) return false; // hide drafts — only listed parts appear on storefront
    if (category !== 'all' && p.cat !== category) return false;
    if (showSubs && activeSub !== 'all' && p.sub !== activeSub) return false;
    if (partSearch.trim()) {
      const q = partSearch.toLowerCase();
      const hay = (p.name + ' ' + p.desc + ' ' + (p.specs || []).join(' ')).toLowerCase();
      if (!hay.includes(q)) return false;
    }
    return true;
  }).sort((a, b) => {
    if (partSort === 'priceLow') return a.price - b.price;
    if (partSort === 'priceHigh') return b.price - a.price;
    if (partSort === 'nameAZ') return a.name.localeCompare(b.name);
    return 0;
  });

  const filteredCars = cars.filter(c => {
    if (carSearch.trim()) {
      const q = carSearch.toLowerCase();
      const hay = (c.name + ' ' + c.desc + ' ' + c.tagline + ' ' + (c.specs || []).join(' ')).toLowerCase();
      if (!hay.includes(q)) return false;
    }
    return true;
  }).sort((a, b) => {
    if (carSort === 'priceLow') return a.price - b.price;
    if (carSort === 'priceHigh') return b.price - a.price;
    if (carSort === 'yearNew') return b.year - a.year;
    return 0;
  });

  const changeCategory = (id) => { setCategory(id); setSubcategory('all'); };
  const goTo = (id) => { document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' }); setMenuOpen(false); };
  const runShippingQuote = () => {
    const dist = getZipDistance(shipZip);
    if (dist === null) { setShipError('Please enter a valid 5-digit US ZIP code'); setShipQuote(null); return; }
    setShipError(''); setShipQuote(calcShippingQuote(dist));
  };
  const dismissCookies = () => { setShowCookieBanner(false); persist('dbm:cookies', 'dismissed'); };

  const subCounts = {};
  if (showSubs) {
    parts.filter(p => p.cat === category).forEach(p => {
      subCounts[p.sub] = (subCounts[p.sub] || 0) + 1;
      subCounts.all = (subCounts.all || 0) + 1;
    });
  }

  // ============================================
  // ADMIN PANEL
  // ============================================
  if (isAdmin) {
    const totalStock = parts.reduce((s, p) => s + (p.stock || 0), 0);
    const inventoryValue = parts.reduce((s, p) => s + (p.stock || 0) * (p.price || 0), 0);
    const carsValue = cars.reduce((s, c) => s + (c.price || 0), 0);
    const lowStock = parts.filter(p => (p.stock || 0) <= 2);
    const pendingOrders = orders.filter(o => o.status === 'processing').length;
    const shippedOrders = orders.filter(o => o.status === 'shipped').length;
    const todayRevenue = orders.filter(o => o.date === '2026-04-22').reduce((s, o) => s + o.total, 0);
    const weekRevenue = orders.reduce((s, o) => s + o.total, 0);

    const adminFiltered = parts.filter(p => !adminSearch.trim() || p.name.toLowerCase().includes(adminSearch.toLowerCase()));

    return (
      <div className="min-h-screen" style={{ background: '#f1f5f9', fontFamily: '"Helvetica Neue", Helvetica, Arial, sans-serif' }}>
        {/* ADMIN HEADER */}
        <header className="bg-white shadow-md sticky top-0 z-30" style={{ borderBottom: `4px solid ${C.red}` }}>
          <div className="max-w-7xl mx-auto px-4 md:px-6 h-20 flex items-center justify-between gap-4">
            <div className="flex items-center gap-4">
              <Logo size="sm" />
              <div className="hidden md:block h-10 w-px" style={{ background: C.silver }} />
              <div className="hidden md:block">
                <div className="text-xs uppercase tracking-widest font-bold" style={{ color: C.red }}>Admin Console</div>
                <div className="text-sm font-bold" style={{ color: C.charcoal }}>Dashboard</div>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <div className="hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-full" style={{ background: C.cream, border: `1px solid ${C.silver}` }}>
                <div className="w-2 h-2 rounded-full" style={{ background: '#22c55e' }} />
                <span className="text-xs font-bold" style={{ color: C.charcoal }}>Signed in as Admin</span>
              </div>
              <button onClick={doLogout} className="px-4 py-2 rounded flex items-center gap-2 font-bold text-sm text-white transition hover:opacity-90" style={{ background: C.charcoal }}>
                <LogOut size={16} /> <span className="hidden sm:inline">Sign Out</span>
              </button>
            </div>
          </div>
          {/* TABS */}
          <div className="max-w-7xl mx-auto px-4 md:px-6 flex gap-1 overflow-x-auto">
            {[
              { id: 'dashboard', label: 'Dashboard', Icon: BarChart3 },
              { id: 'parts', label: 'Parts', Icon: Package },
              { id: 'cars', label: 'Cars', Icon: Car },
              { id: 'orders', label: 'Orders', Icon: ClipboardList },
            ].map(({ id, label, Icon }) => {
              const active = adminTab === id;
              return (
                <button key={id} onClick={() => setAdminTab(id)}
                  className="px-4 py-3 font-bold text-sm uppercase tracking-wide transition flex items-center gap-2 border-b-2 whitespace-nowrap"
                  style={{ color: active ? C.red : C.gray, borderColor: active ? C.red : 'transparent' }}>
                  <Icon size={16} /> {label}
                </button>
              );
            })}
          </div>
        </header>

        <main className="max-w-7xl mx-auto px-4 md:px-6 py-6 md:py-8">
          {/* DASHBOARD */}
          {adminTab === 'dashboard' && (
            <div>
              <div className="flex items-center justify-between mb-6 flex-wrap gap-3">
                <div>
                  <h1 className="text-2xl md:text-3xl font-black" style={{ fontFamily: 'Impact, sans-serif', color: C.charcoal }}>DASHBOARD</h1>
                  <div className="text-sm text-slate-500">Overview — {new Date().toLocaleDateString('en-US', { dateStyle: 'full' })}</div>
                </div>
                <button onClick={resetDemoData} className="text-xs px-3 py-1.5 rounded border font-bold uppercase tracking-wide" style={{ borderColor: C.silver, color: C.gray }}>
                  Reset Demo Data
                </button>
              </div>

              {/* STATS */}
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 md:gap-4 mb-6">
                {[
                  { label: 'Today Revenue', value: fmt(todayRevenue), sub: '7-day: ' + fmt(weekRevenue), color: C.red },
                  { label: 'Open Orders', value: pendingOrders, sub: shippedOrders + ' shipped', color: C.blue },
                  { label: 'Inventory Value', value: fmt(inventoryValue), sub: totalStock + ' units in stock', color: C.charcoal },
                  { label: 'Cars Listed', value: cars.length, sub: fmt(carsValue) + ' total value', color: '#0369a1' },
                ].map((s, i) => (
                  <div key={i} className="bg-white rounded-lg p-4 md:p-5 shadow-sm" style={{ border: `1px solid ${C.silver}` }}>
                    <div className="text-[10px] md:text-xs uppercase tracking-widest font-bold mb-1" style={{ color: s.color }}>{s.label}</div>
                    <div className="text-xl md:text-3xl font-black leading-tight truncate" style={{ fontFamily: 'Impact, sans-serif', color: C.charcoal }}>{s.value}</div>
                    <div className="text-[10px] md:text-xs text-slate-500 mt-1 truncate">{s.sub}</div>
                  </div>
                ))}
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                {/* LOW STOCK */}
                <div className="bg-white rounded-lg p-5 shadow-sm" style={{ border: `1px solid ${C.silver}` }}>
                  <div className="flex items-center gap-2 mb-4">
                    <AlertCircle size={18} style={{ color: C.red }} />
                    <h3 className="font-black uppercase tracking-wide" style={{ fontFamily: 'Impact, sans-serif', color: C.charcoal }}>Low Stock Alerts</h3>
                  </div>
                  {lowStock.length === 0 ? (
                    <div className="text-sm text-slate-500 py-4 text-center">All parts stocked — nothing running low</div>
                  ) : (
                    <div className="space-y-2">
                      {lowStock.slice(0, 6).map(p => (
                        <div key={p.id} className="flex items-center justify-between text-sm p-2 rounded" style={{ background: C.cream }}>
                          <div className="flex-1 truncate pr-2">
                            <div className="font-bold truncate">{p.name}</div>
                            <div className="text-xs text-slate-500">{CATS.find(c => c.id === p.cat)?.label}</div>
                          </div>
                          <div className="px-2 py-1 rounded text-xs font-black" style={{ background: p.stock === 0 ? C.red : '#f59e0b', color: 'white' }}>
                            {p.stock} left
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                {/* RECENT ORDERS */}
                <div className="bg-white rounded-lg p-5 shadow-sm" style={{ border: `1px solid ${C.silver}` }}>
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-2">
                      <ClipboardList size={18} style={{ color: C.blue }} />
                      <h3 className="font-black uppercase tracking-wide" style={{ fontFamily: 'Impact, sans-serif', color: C.charcoal }}>Recent Orders</h3>
                    </div>
                    <button onClick={() => setAdminTab('orders')} className="text-xs font-bold uppercase tracking-wide hover:underline" style={{ color: C.red }}>View All</button>
                  </div>
                  <div className="space-y-2">
                    {orders.slice(0, 5).map(o => (
                      <div key={o.id} className="flex items-center justify-between text-sm py-2" style={{ borderBottom: `1px solid ${C.cream}` }}>
                        <div className="flex-1 min-w-0">
                          <div className="font-bold truncate">{o.customer}</div>
                          <div className="text-xs text-slate-500 truncate">{o.items}</div>
                        </div>
                        <div className="text-right flex-shrink-0">
                          <div className="font-black text-sm">{fmt(o.total)}</div>
                          <StatusPill status={o.status} />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* PARTS */}
          {adminTab === 'parts' && (
            <div>
              <div className="mb-6">
                <h1 className="text-2xl md:text-3xl font-black" style={{ fontFamily: 'Impact, sans-serif', color: C.charcoal }}>INVENTORY</h1>
                <div className="text-sm text-slate-500 mb-3 flex flex-wrap gap-x-3 gap-y-1">
                  <span><strong>{parts.length}</strong> total</span>
                  <span>•</span>
                  <span style={{ color: '#166534' }}><strong>{parts.filter(p => p.listed !== false && (p.stock || 0) > 0).length}</strong> listed</span>
                  <span>•</span>
                  <span style={{ color: '#374151' }}><strong>{parts.filter(p => p.listed === false).length}</strong> drafts</span>
                  <span>•</span>
                  <span style={{ color: '#991b1b' }}><strong>{parts.filter(p => (p.stock || 0) === 0).length}</strong> sold out</span>
                  <span>•</span>
                  <span><strong>{fmt(inventoryValue)}</strong> total value</span>
                </div>
                <button onClick={() => setPartEdit({ id: 'new-' + Date.now(), cat: 'cobra', sub: 'engine', name: '', price: 0, stock: 0, desc: '', specs: [], listed: false, sold: 0 })}
                  className="w-full sm:w-auto px-5 py-3 rounded font-black text-sm uppercase tracking-wide text-white flex items-center justify-center gap-2 hover:opacity-90 shadow-md" style={{ background: C.red, boxShadow: '0 4px 12px rgba(220,38,38,0.3)' }}>
                  <Plus size={18} /> Add Part to Inventory
                </button>
              </div>

              <div className="bg-white rounded-lg shadow-sm overflow-hidden" style={{ border: `1px solid ${C.silver}` }}>
                <div className="p-4" style={{ borderBottom: `1px solid ${C.silver}`, background: C.cream }}>
                  <div className="relative">
                    <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2" style={{ color: C.gray }} />
                    <input type="text" value={adminSearch} onChange={(e) => setAdminSearch(e.target.value)}
                      placeholder="Search inventory by name..."
                      className="w-full pl-9 pr-3 py-2 rounded border text-sm bg-white" style={{ borderColor: C.silver }} />
                  </div>
                </div>
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead style={{ background: C.cream }}>
                      <tr>
                        <th className="text-left p-3 font-bold text-xs uppercase tracking-wider" style={{ color: C.gray }}>Part</th>
                        <th className="text-left p-3 font-bold text-xs uppercase tracking-wider hidden md:table-cell" style={{ color: C.gray }}>Category</th>
                        <th className="text-right p-3 font-bold text-xs uppercase tracking-wider" style={{ color: C.gray }}>Price</th>
                        <th className="text-center p-3 font-bold text-xs uppercase tracking-wider" style={{ color: C.gray }}>Stock</th>
                        <th className="text-center p-3 font-bold text-xs uppercase tracking-wider hidden md:table-cell" style={{ color: C.gray }}>Sold</th>
                        <th className="text-center p-3 font-bold text-xs uppercase tracking-wider" style={{ color: C.gray }}>Status</th>
                        <th className="text-right p-3 font-bold text-xs uppercase tracking-wider" style={{ color: C.gray }}>Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {adminFiltered.map(p => {
                        const isListed = p.listed !== false;
                        const outOfStock = (p.stock || 0) === 0;
                        const status = outOfStock ? 'soldout' : isListed ? 'listed' : 'draft';
                        const statusColors = {
                          soldout: { bg: '#fee2e2', fg: '#991b1b', label: 'Sold Out' },
                          listed: { bg: '#dcfce7', fg: '#166534', label: 'Listed' },
                          draft: { bg: '#e5e7eb', fg: '#374151', label: 'Draft' },
                        };
                        const sc = statusColors[status];
                        return (
                          <tr key={p.id} style={{ borderTop: `1px solid ${C.cream}` }}>
                            <td className="p-3">
                              <div className="flex items-center gap-3">
                                <div className="w-10 h-10 rounded flex-shrink-0 overflow-hidden"><PartIcon cat={p.cat} /></div>
                                <div className="min-w-0">
                                  <div className="font-bold truncate max-w-xs">{p.name || '(Unnamed part)'}</div>
                                  <div className="text-xs text-slate-500 md:hidden">{CATS.find(c => c.id === p.cat)?.label}</div>
                                </div>
                              </div>
                            </td>
                            <td className="p-3 hidden md:table-cell text-slate-600">
                              {CATS.find(c => c.id === p.cat)?.label}
                              {p.sub && (p.cat === 'cobra' || p.cat === 'mustang') && <span className="text-xs text-slate-400"> / {SUBS.find(s => s.id === p.sub)?.label}</span>}
                            </td>
                            <td className="p-3 text-right font-bold">{fmt(p.price)}</td>
                            <td className="p-3 text-center">
                              <span className="px-2 py-0.5 rounded text-xs font-bold" style={{ background: (p.stock || 0) === 0 ? '#fee2e2' : (p.stock || 0) <= 2 ? '#fef3c7' : '#dcfce7', color: (p.stock || 0) === 0 ? '#991b1b' : (p.stock || 0) <= 2 ? '#92400e' : '#166534' }}>
                                {p.stock || 0}
                              </span>
                            </td>
                            <td className="p-3 text-center hidden md:table-cell font-bold" style={{ color: (p.sold || 0) > 0 ? C.charcoal : C.gray }}>{p.sold || 0}</td>
                            <td className="p-3 text-center">
                              <button
                                onClick={() => {
                                  if (outOfStock) { showToast('Out of stock — restock first'); return; }
                                  updateParts(parts.map(x => x.id === p.id ? { ...x, listed: !isListed } : x));
                                  showToast(isListed ? 'Moved to drafts' : 'Listed on storefront');
                                }}
                                disabled={outOfStock}
                                className="px-2.5 py-1 rounded text-[10px] font-black uppercase tracking-wider transition hover:opacity-80 disabled:cursor-not-allowed"
                                style={{ background: sc.bg, color: sc.fg, border: `1px solid ${sc.fg}22` }}
                                title={outOfStock ? 'Out of stock' : isListed ? 'Click to unlist (move to drafts)' : 'Click to list on storefront'}>
                                {sc.label}
                              </button>
                            </td>
                            <td className="p-3">
                              <div className="flex items-center justify-end gap-1">
                                <button onClick={() => setPartEdit(p)} className="w-8 h-8 rounded flex items-center justify-center hover:opacity-80" style={{ background: C.blue, color: 'white' }} title="Edit"><Edit3 size={14} /></button>
                                <button onClick={() => deletePart(p.id)} className="w-8 h-8 rounded flex items-center justify-center hover:opacity-80" style={{ background: C.red, color: 'white' }} title="Delete"><Trash2 size={14} /></button>
                              </div>
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                  {adminFiltered.length === 0 && <div className="p-8 text-center text-slate-500 text-sm">No parts match your search.</div>}
                </div>
              </div>
            </div>
          )}

          {/* CARS */}
          {adminTab === 'cars' && (
            <div>
              <div className="mb-6">
                <h1 className="text-2xl md:text-3xl font-black" style={{ fontFamily: 'Impact, sans-serif', color: C.charcoal }}>CARS FOR SALE</h1>
                <div className="text-sm text-slate-500 mb-3">{cars.length} cars • {fmt(carsValue)} total value</div>
                <button onClick={() => setCarEdit({ id: 'new-' + Date.now(), name: '', year: new Date().getFullYear(), price: 0, tagline: '', desc: '', specs: [] })}
                  className="w-full sm:w-auto px-5 py-3 rounded font-black text-sm uppercase tracking-wide text-white flex items-center justify-center gap-2 hover:opacity-90 shadow-md" style={{ background: C.red, boxShadow: '0 4px 12px rgba(220,38,38,0.3)' }}>
                  <Plus size={18} /> Add New Car
                </button>
              </div>

              <div className="grid sm:grid-cols-2 gap-4">
                {cars.map((car, i) => (
                  <div key={car.id} className="bg-white rounded-lg overflow-hidden shadow-sm" style={{ border: `1px solid ${C.silver}` }}>
                    <div className="h-40"><CarIllustration idx={i} /></div>
                    <div className="p-4">
                      <div className="text-xs uppercase tracking-widest font-bold" style={{ color: C.red }}>{car.year}</div>
                      <h3 className="font-black text-lg leading-tight mt-0.5" style={{ fontFamily: 'Impact, sans-serif', color: C.charcoal }}>{car.name}</h3>
                      <div className="text-xs text-slate-500 mt-1">{car.tagline}</div>
                      <div className="flex items-center justify-between mt-3 pt-3" style={{ borderTop: `1px solid ${C.cream}` }}>
                        <div className="text-xl font-black" style={{ color: C.blueDark, fontFamily: 'Impact, sans-serif' }}>{fmt(car.price)}</div>
                        <div className="flex gap-1">
                          <button onClick={() => setCarEdit(car)} className="px-3 py-1.5 rounded text-xs font-bold uppercase flex items-center gap-1 text-white hover:opacity-90" style={{ background: C.blue }}><Edit3 size={12} /> Edit</button>
                          <button onClick={() => deleteCar(car.id)} className="w-8 h-8 rounded flex items-center justify-center hover:opacity-80" style={{ background: C.red, color: 'white' }}><Trash2 size={12} /></button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* ORDERS */}
          {adminTab === 'orders' && (
            <div>
              <div className="mb-6">
                <h1 className="text-2xl md:text-3xl font-black" style={{ fontFamily: 'Impact, sans-serif', color: C.charcoal }}>ORDERS</h1>
                <div className="text-sm text-slate-500">{orders.length} total • {pendingOrders} processing</div>
              </div>
              <div className="bg-white rounded-lg shadow-sm overflow-hidden" style={{ border: `1px solid ${C.silver}` }}>
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead style={{ background: C.cream }}>
                      <tr>
                        <th className="text-left p-3 font-bold text-xs uppercase tracking-wider" style={{ color: C.gray }}>Order</th>
                        <th className="text-left p-3 font-bold text-xs uppercase tracking-wider hidden md:table-cell" style={{ color: C.gray }}>Customer</th>
                        <th className="text-left p-3 font-bold text-xs uppercase tracking-wider hidden lg:table-cell" style={{ color: C.gray }}>Items</th>
                        <th className="text-right p-3 font-bold text-xs uppercase tracking-wider" style={{ color: C.gray }}>Total</th>
                        <th className="text-center p-3 font-bold text-xs uppercase tracking-wider" style={{ color: C.gray }}>Status</th>
                      </tr>
                    </thead>
                    <tbody>
                      {orders.map(o => (
                        <tr key={o.id} style={{ borderTop: `1px solid ${C.cream}` }}>
                          <td className="p-3">
                            <div className="font-bold text-xs md:text-sm font-mono">{o.id}</div>
                            <div className="text-xs text-slate-500">{o.date}</div>
                            <div className="text-xs text-slate-600 md:hidden mt-1">{o.customer}</div>
                          </td>
                          <td className="p-3 hidden md:table-cell">
                            <div className="font-bold">{o.customer}</div>
                            <div className="text-xs text-slate-500">{o.email}</div>
                          </td>
                          <td className="p-3 hidden lg:table-cell text-slate-600 max-w-xs truncate">{o.items}</td>
                          <td className="p-3 text-right font-black">{fmt(o.total)}</td>
                          <td className="p-3">
                            <select value={o.status} onChange={(e) => updateOrderStatus(o.id, e.target.value)}
                              className="px-2 py-1 rounded text-xs font-bold cursor-pointer"
                              style={{
                                background: o.status === 'processing' ? '#fef3c7' : o.status === 'shipped' ? '#dbeafe' : o.status === 'delivered' ? '#dcfce7' : '#fee2e2',
                                color: o.status === 'processing' ? '#92400e' : o.status === 'shipped' ? '#1e40af' : o.status === 'delivered' ? '#166534' : '#991b1b',
                                border: 'none',
                              }}>
                              <option value="processing">Processing</option>
                              <option value="shipped">Shipped</option>
                              <option value="delivered">Delivered</option>
                              <option value="cancelled">Cancelled</option>
                            </select>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}
        </main>

        {/* PART EDITOR */}
        {partEdit && <PartEditor part={partEdit} onSave={savePart} onClose={() => setPartEdit(null)} />}
        {carEdit && <CarEditor car={carEdit} onSave={saveCar} onClose={() => setCarEdit(null)} />}

        {/* TOAST */}
        {toast && (
          <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-[60] px-5 py-3 rounded-lg shadow-2xl flex items-center gap-2 text-sm font-bold"
            style={{ background: C.charcoal, color: 'white', border: `2px solid ${C.red}` }}>
            <Check size={16} style={{ color: C.red }} /> {toast}
          </div>
        )}
      </div>
    );
  }

  // ============================================
  // PUBLIC STOREFRONT
  // ============================================
  return (
    <div className="min-h-screen" style={{ background: C.cream, fontFamily: '"Helvetica Neue", Helvetica, Arial, sans-serif', color: C.charcoal }}>
      {/* NAV */}
      <nav className="sticky top-0 z-40 bg-white shadow-lg" style={{ borderBottom: `4px solid ${C.blue}` }}>
        <div className="max-w-7xl mx-auto px-4 md:px-6 h-20 flex items-center justify-between">
          <button onClick={() => goTo('home')} className="flex items-center"><Logo size="sm" /></button>
          <div className="hidden md:flex items-center gap-8 font-bold text-sm tracking-wide uppercase" style={{ color: C.charcoal }}>
            <button onClick={() => goTo('shop')} className="hover:text-red-600 transition">Shop Parts</button>
            <button onClick={() => goTo('cars')} className="hover:text-red-600 transition">Cars For Sale</button>
            <button onClick={() => goTo('shipping')} className="hover:text-red-600 transition">Shipping</button>
            <button onClick={() => goTo('gallery')} className="hover:text-red-600 transition">Gallery</button>
            <button onClick={() => goTo('history')} className="hover:text-red-600 transition">History</button>
            <button onClick={() => goTo('contact')} className="hover:text-red-600 transition">Contact</button>
          </div>
          <div className="flex items-center gap-2">
            <button onClick={() => setCartOpen(true)} className="relative px-4 py-2 rounded flex items-center gap-2 font-bold text-white transition hover:opacity-90" style={{ background: C.red }}>
              <ShoppingCart size={18} /><span className="hidden sm:inline">Cart</span>
              {cartCount > 0 && <span className="absolute -top-2 -right-2 w-6 h-6 rounded-full flex items-center justify-center text-xs font-black" style={{ background: C.charcoal, color: 'white', border: '2px solid white' }}>{cartCount}</span>}
            </button>
            <button onClick={() => setMenuOpen(!menuOpen)} className="md:hidden p-2"><Menu size={24} /></button>
          </div>
        </div>
        {menuOpen && (
          <div className="md:hidden bg-white border-t px-6 py-4 flex flex-col gap-3 font-bold uppercase text-sm">
            <button onClick={() => goTo('shop')} className="text-left py-2">Shop Parts</button>
            <button onClick={() => goTo('cars')} className="text-left py-2">Cars For Sale</button>
            <button onClick={() => goTo('shipping')} className="text-left py-2">Shipping</button>
            <button onClick={() => goTo('gallery')} className="text-left py-2">Gallery</button>
            <button onClick={() => goTo('history')} className="text-left py-2">History</button>
            <button onClick={() => goTo('contact')} className="text-left py-2">Contact</button>
          </div>
        )}
      </nav>

      {/* HERO */}
      <section id="home" className="relative overflow-hidden" style={{ background: `linear-gradient(135deg, ${C.charcoal} 0%, ${C.blueDark} 40%, ${C.blue} 100%)` }}>
        <div className="absolute inset-0 opacity-5" style={{ backgroundImage: 'repeating-linear-gradient(135deg, transparent, transparent 40px, white 40px, white 41px)' }} />
        <div className="absolute top-0 left-0 right-0 h-2" style={{ background: `linear-gradient(90deg, ${C.red} 0%, ${C.red} 50%, white 50%, white 100%)` }} />
        <div className="relative max-w-7xl mx-auto px-6 py-24 md:py-32 text-center">
          <div className="mb-8 flex justify-center"><Logo size="lg" /></div>
          <div className="w-24 h-1 mx-auto my-8" style={{ background: C.red }} />
          <h1 className="text-white text-3xl md:text-5xl font-black tracking-tight mb-4" style={{ fontFamily: 'Impact, sans-serif', textShadow: '3px 3px 0 rgba(0,0,0,0.3)' }}>A PIECE OF AUTOMOTIVE HISTORY</h1>
          <p className="text-slate-200 text-lg md:text-xl max-w-2xl mx-auto mb-10 font-light">Original Shelby Cobra parts, Ford FE crate motors, and Mustang restoration components. Windsor, California since 2008.</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button onClick={() => goTo('shop')} className="px-8 py-4 font-black uppercase tracking-wider text-white rounded transition hover:scale-105 flex items-center justify-center gap-2" style={{ background: C.red, boxShadow: '0 4px 12px rgba(220,38,38,0.4)' }}>Shop Parts <ArrowRight size={18} /></button>
            <button onClick={() => goTo('cars')} className="px-8 py-4 font-black uppercase tracking-wider rounded transition hover:scale-105 flex items-center justify-center gap-2 bg-white" style={{ color: C.blueDark }}>View Cars <ChevronRight size={18} /></button>
          </div>
        </div>
        <div className="relative grid grid-cols-2 md:grid-cols-4 gap-px" style={{ background: 'rgba(255,255,255,0.1)' }}>
          {[{ n: '2008', l: 'Founded' },{ n: '500+', l: 'Cobras Delivered' },{ n: '427ci', l: 'Signature Displacement' },{ n: '#1', l: 'CSX Cobra Dealer' }].map((s, i) => (
            <div key={i} className="py-6 text-center" style={{ background: C.blueDark }}>
              <div className="text-white text-2xl md:text-3xl font-black" style={{ fontFamily: 'Impact, sans-serif' }}>{s.n}</div>
              <div className="text-slate-300 text-xs uppercase tracking-wider mt-1">{s.l}</div>
            </div>
          ))}
        </div>
      </section>

      {/* SHOP */}
      <section id="shop" className="py-16 md:py-20 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <div className="inline-block px-4 py-1 rounded-full text-xs font-black uppercase tracking-widest mb-4" style={{ background: C.red, color: 'white' }}>Shop</div>
            <h2 className="text-4xl md:text-5xl font-black" style={{ fontFamily: 'Impact, sans-serif', color: C.charcoal }}>ORIGINAL PARTS & CRATE MOTORS</h2>
            <div className="w-16 h-1 mx-auto mt-4" style={{ background: C.red }} />
          </div>

          <div className="flex flex-col sm:flex-row gap-3 mb-6 max-w-3xl mx-auto">
            <div className="relative flex-1">
              <Search size={18} className="absolute left-3 top-1/2 -translate-y-1/2" style={{ color: C.gray }} />
              <input type="text" value={partSearch} onChange={(e) => setPartSearch(e.target.value)} placeholder="Search parts by name, spec, or keyword..." className="w-full pl-10 pr-10 py-2.5 rounded-lg text-sm bg-white focus:outline-none" style={{ border: `2px solid ${C.silver}` }} />
              {partSearch && <button onClick={() => setPartSearch('')} className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 rounded-full flex items-center justify-center" style={{ background: C.silver }}><X size={12} /></button>}
            </div>
            <div className="relative">
              <ArrowUpDown size={16} className="absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" style={{ color: C.gray }} />
              <select value={partSort} onChange={(e) => setPartSort(e.target.value)} className="appearance-none pl-9 pr-8 py-2.5 rounded-lg text-sm font-bold bg-white cursor-pointer" style={{ border: `2px solid ${C.silver}`, color: C.charcoal }}>
                <option value="featured">Featured</option>
                <option value="priceLow">Price: Low to High</option>
                <option value="priceHigh">Price: High to Low</option>
                <option value="nameAZ">Name: A – Z</option>
              </select>
            </div>
          </div>

          <div className="flex flex-wrap gap-2 justify-center mb-4">
            {CATS.map(({ id, label, Icon }) => {
              const active = category === id;
              return (
                <button key={id} onClick={() => changeCategory(id)} className="px-4 py-2 rounded font-bold text-sm uppercase tracking-wide transition flex items-center gap-2" style={{ background: active ? C.blue : 'white', color: active ? 'white' : C.charcoal, border: `2px solid ${active ? C.blue : '#e2e8f0'}` }}>
                  <Icon size={16} /> {label}
                </button>
              );
            })}
          </div>

          {showSubs && (
            <div className="mb-8 pt-4 pb-2" style={{ borderTop: `1px dashed ${C.silver}` }}>
              <div className="text-center mb-3 text-xs uppercase tracking-widest font-bold" style={{ color: C.gray }}>Filter by Component</div>
              <div className="flex flex-wrap gap-2 justify-center">
                {SUBS.map(({ id, label }) => {
                  const count = subCounts[id] || 0;
                  if (id !== 'all' && count === 0) return null;
                  const active = subcategory === id;
                  return (
                    <button key={id} onClick={() => setSubcategory(id)} className="px-3 py-1.5 rounded-full font-bold text-xs uppercase tracking-wide transition flex items-center gap-1.5" style={{ background: active ? C.red : 'white', color: active ? 'white' : C.charcoal, border: `1.5px solid ${active ? C.red : '#cbd5e1'}` }}>
                      {label}<span className="opacity-70 text-[10px]">({count})</span>
                    </button>
                  );
                })}
              </div>
            </div>
          )}

          <div className="text-center mb-6 text-sm text-slate-500">{filtered.length} {filtered.length === 1 ? 'part' : 'parts'}</div>

          {filtered.length === 0 ? (
            <div className="text-center py-16 text-slate-500">No parts match that filter.</div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {filtered.map(p => (
                <div key={p.id} className="bg-white rounded-lg overflow-hidden transition hover:shadow-xl hover:-translate-y-1 flex flex-col relative" style={{ border: '1px solid #e2e8f0' }}>
                  <button onClick={() => setProductModal(p)} className="h-48 w-full block"><PartIcon cat={p.cat} /></button>
                  <button onClick={(e) => { e.stopPropagation(); share(p, 'parts'); }} className="absolute top-3 right-3 w-9 h-9 rounded-full flex items-center justify-center hover:scale-110 transition" style={{ background: 'rgba(15,23,42,0.75)', color: 'white' }} title="Share"><Share2 size={15} /></button>
                  <div className="p-5 flex flex-col flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <div className="text-xs uppercase tracking-widest font-bold" style={{ color: C.red }}>{CATS.find(c => c.id === p.cat)?.label}</div>
                      {p.sub && (p.cat === 'cobra' || p.cat === 'mustang') && <div className="text-xs uppercase font-bold px-2 py-0.5 rounded-full" style={{ background: C.cream, color: C.gray, border: `1px solid ${C.silver}` }}>{SUBS.find(s => s.id === p.sub)?.label}</div>}
                    </div>
                    <h3 className="font-black text-lg mb-2 leading-tight" style={{ color: C.charcoal }}>{p.name}</h3>
                    <p className="text-sm text-slate-600 flex-1 line-clamp-2">{p.desc}</p>
                    <div className="mt-4 flex items-end justify-between gap-2">
                      <div>
                        <div className="text-2xl font-black" style={{ color: C.blueDark, fontFamily: 'Impact, sans-serif' }}>{fmt(p.price)}</div>
                        <div className="text-xs font-bold" style={{ color: (p.stock || 0) === 0 ? C.red : C.gray }}>{(p.stock || 0) === 0 ? 'SOLD OUT' : `${p.stock} in stock`}</div>
                      </div>
                      {(p.stock || 0) === 0 ? (
                        <button disabled className="px-4 py-2 rounded font-bold text-sm text-white flex items-center gap-1 cursor-not-allowed opacity-60" style={{ background: C.gray }}>Sold Out</button>
                      ) : (
                        <button onClick={() => addToCart(p)} className="px-4 py-2 rounded font-bold text-sm text-white hover:opacity-90 flex items-center gap-1" style={{ background: C.red }}><Plus size={14} /> Add</button>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* CARS */}
      <section id="cars" className="py-16 md:py-20 px-6" style={{ background: C.charcoal }}>
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <div className="inline-block px-4 py-1 rounded-full text-xs font-black uppercase tracking-widest mb-4" style={{ background: C.red, color: 'white' }}>Inventory</div>
            <h2 className="text-4xl md:text-5xl font-black text-white" style={{ fontFamily: 'Impact, sans-serif' }}>CARS FOR SALE</h2>
            <div className="w-16 h-1 mx-auto mt-4" style={{ background: C.red }} />
            <p className="text-slate-300 mt-4 max-w-2xl mx-auto">Cobras, Daytona Coupes, and GT40 continuation cars.</p>
          </div>

          <div className="flex flex-col sm:flex-row gap-3 mb-8 max-w-3xl mx-auto">
            <div className="relative flex-1">
              <Search size={18} className="absolute left-3 top-1/2 -translate-y-1/2" style={{ color: C.gray }} />
              <input type="text" value={carSearch} onChange={(e) => setCarSearch(e.target.value)} placeholder="Search cars by name, year, or spec..." className="w-full pl-10 pr-10 py-2.5 rounded-lg text-sm focus:outline-none" style={{ background: 'rgba(255,255,255,0.08)', border: '1.5px solid rgba(255,255,255,0.2)', color: 'white' }} />
              {carSearch && <button onClick={() => setCarSearch('')} className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 rounded-full flex items-center justify-center" style={{ background: 'rgba(255,255,255,0.2)', color: 'white' }}><X size={12} /></button>}
            </div>
            <div className="relative">
              <ArrowUpDown size={16} className="absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" style={{ color: '#cbd5e1' }} />
              <select value={carSort} onChange={(e) => setCarSort(e.target.value)} className="appearance-none pl-9 pr-8 py-2.5 rounded-lg text-sm font-bold cursor-pointer" style={{ background: 'rgba(255,255,255,0.08)', border: '1.5px solid rgba(255,255,255,0.2)', color: 'white' }}>
                <option value="featured" style={{ color: C.charcoal }}>Featured</option>
                <option value="priceLow" style={{ color: C.charcoal }}>Price: Low to High</option>
                <option value="priceHigh" style={{ color: C.charcoal }}>Price: High to Low</option>
                <option value="yearNew" style={{ color: C.charcoal }}>Year: Newest First</option>
              </select>
            </div>
          </div>

          {filteredCars.length === 0 ? (
            <div className="text-center py-16 text-slate-400">No cars match that search.</div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {filteredCars.map((car) => (
                <div key={car.id} className="bg-white rounded-lg overflow-hidden hover:shadow-2xl relative">
                  <div className="h-56"><CarIllustration idx={cars.indexOf(car)} /></div>
                  <button onClick={(e) => { e.stopPropagation(); share(car, 'cars'); }} className="absolute top-3 right-3 w-9 h-9 rounded-full flex items-center justify-center hover:scale-110" style={{ background: 'rgba(15,23,42,0.75)', color: 'white' }}><Share2 size={15} /></button>
                  <div className="p-6">
                    <div className="text-xs uppercase tracking-widest font-bold mb-1" style={{ color: C.red }}>{car.year} • DenBeste Inventory</div>
                    <h3 className="font-black text-2xl mb-1 leading-tight" style={{ color: C.charcoal, fontFamily: 'Impact, sans-serif' }}>{car.name}</h3>
                    <p className="text-sm text-slate-600 mb-4">{car.tagline}</p>
                    <div className="flex items-end justify-between">
                      <div className="text-3xl font-black" style={{ color: C.blueDark, fontFamily: 'Impact, sans-serif' }}>{fmt(car.price)}</div>
                      <button onClick={() => setCarModal(car)} className="px-5 py-2.5 rounded font-bold text-sm uppercase tracking-wide text-white hover:opacity-90 flex items-center gap-2" style={{ background: C.blue }}>View Details <ChevronRight size={16} /></button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* SHIPPING */}
      <section id="shipping" className="py-16 md:py-20 px-6 bg-white">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <div className="inline-block px-4 py-1 rounded-full text-xs font-black uppercase tracking-widest mb-4" style={{ background: C.red, color: 'white' }}>Transport</div>
            <h2 className="text-4xl md:text-5xl font-black" style={{ fontFamily: 'Impact, sans-serif', color: C.charcoal }}>SHIP YOUR CAR</h2>
            <div className="w-16 h-1 mx-auto mt-4" style={{ background: C.red }} />
            <p className="text-slate-600 mt-4 max-w-2xl mx-auto">Door-to-door transport from our Windsor, CA shop to anywhere in the continental US.</p>
          </div>

          <div className="grid md:grid-cols-5 gap-6">
            <div className="md:col-span-2 p-6 rounded-lg" style={{ background: C.cream, border: `2px solid ${C.silver}` }}>
              <div className="flex items-center gap-2 mb-5">
                <div className="w-10 h-10 rounded-full flex items-center justify-center" style={{ background: C.blue }}><Truck size={18} color="white" /></div>
                <h3 className="font-black text-xl uppercase tracking-wide" style={{ fontFamily: 'Impact, sans-serif', color: C.charcoal }}>Get A Quote</h3>
              </div>
              <label className="block text-xs uppercase tracking-widest font-bold mb-1.5" style={{ color: C.gray }}>Vehicle</label>
              <select value={shipCarId} onChange={(e) => setShipCarId(e.target.value)} className="w-full px-3 py-2.5 rounded border text-sm bg-white mb-4" style={{ borderColor: C.silver }}>
                <option value="">Select a car...</option>
                {cars.map(c => <option key={c.id} value={c.id}>{c.name}</option>)}
                <option value="other">Another car / project vehicle</option>
              </select>
              <label className="block text-xs uppercase tracking-widest font-bold mb-1.5" style={{ color: C.gray }}>Pickup Location</label>
              <div className="w-full px-3 py-2.5 rounded text-sm mb-4 flex items-center gap-2" style={{ background: 'white', border: `1px solid ${C.silver}`, color: C.gray }}>
                <MapPin size={14} style={{ color: C.red }} /> Windsor, CA 95492
              </div>
              <label className="block text-xs uppercase tracking-widest font-bold mb-1.5" style={{ color: C.gray }}>Destination ZIP</label>
              <input type="text" inputMode="numeric" maxLength={5} value={shipZip} onChange={(e) => { setShipZip(e.target.value.replace(/\D/g, '').slice(0, 5)); setShipError(''); }} placeholder="e.g. 90210" className="w-full px-3 py-2.5 rounded border text-sm bg-white font-mono tracking-widest" style={{ borderColor: shipError ? C.red : C.silver }} />
              {shipError && <div className="text-xs mt-1" style={{ color: C.red }}>{shipError}</div>}
              <button onClick={runShippingQuote} disabled={!shipZip} className="w-full mt-6 py-3 rounded font-black uppercase tracking-wider text-white transition hover:opacity-90 disabled:opacity-40 flex items-center justify-center gap-2" style={{ background: C.red }}>
                <Truck size={16} /> Calculate Quote
              </button>
              <div className="text-[11px] text-slate-500 mt-3 leading-relaxed">Quotes are estimates. Final rate confirmed after booking.</div>
            </div>

            <div className="md:col-span-3">
              {shipQuote ? (
                <div className="space-y-4">
                  <div className="p-5 rounded-lg bg-white" style={{ border: `2px solid ${C.silver}` }}>
                    <div className="flex items-start gap-4">
                      <div className="w-12 h-12 rounded-full flex-shrink-0 flex items-center justify-center" style={{ background: C.cream, border: `2px solid ${C.silver}` }}><Truck size={22} style={{ color: C.blue }} /></div>
                      <div className="flex-1">
                        <div className="flex items-center justify-between gap-3 flex-wrap">
                          <div>
                            <div className="font-black text-lg uppercase tracking-wide" style={{ fontFamily: 'Impact, sans-serif', color: C.charcoal }}>Open Transport</div>
                            <div className="text-xs text-slate-500">Standard multi-car carrier — most economical</div>
                          </div>
                          <div className="text-right">
                            <div className="text-3xl font-black leading-none" style={{ color: C.blueDark, fontFamily: 'Impact, sans-serif' }}>{fmt(shipQuote.open)}</div>
                            <div className="text-[11px] text-slate-500 uppercase tracking-wider mt-0.5">Est. total</div>
                          </div>
                        </div>
                        <div className="grid grid-cols-2 gap-x-4 gap-y-1 mt-3 text-xs text-slate-600">
                          <div className="flex items-center gap-1.5"><Check size={12} style={{ color: C.red }} /> {shipQuote.openDays} days transit</div>
                          <div className="flex items-center gap-1.5"><Check size={12} style={{ color: C.red }} /> Door-to-door service</div>
                          <div className="flex items-center gap-1.5"><Check size={12} style={{ color: C.red }} /> $100k cargo insurance</div>
                          <div className="flex items-center gap-1.5"><Check size={12} style={{ color: C.red }} /> Licensed & bonded carrier</div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="p-5 rounded-lg relative" style={{ background: `linear-gradient(135deg, ${C.blueDark}, ${C.blue})`, color: 'white', border: `2px solid ${C.red}` }}>
                    <div className="absolute -top-3 right-5 px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest" style={{ background: C.red, color: 'white' }}>Recommended</div>
                    <div className="flex items-start gap-4">
                      <div className="w-12 h-12 rounded-full flex-shrink-0 flex items-center justify-center" style={{ background: 'rgba(255,255,255,0.12)', border: '2px solid rgba(255,255,255,0.25)' }}><ShieldCheck size={22} color="white" /></div>
                      <div className="flex-1">
                        <div className="flex items-center justify-between gap-3 flex-wrap">
                          <div>
                            <div className="font-black text-lg uppercase tracking-wide" style={{ fontFamily: 'Impact, sans-serif' }}>Enclosed Transport</div>
                            <div className="text-xs text-slate-300">Fully-enclosed trailer — the only way for a Cobra</div>
                          </div>
                          <div className="text-right">
                            <div className="text-3xl font-black leading-none" style={{ fontFamily: 'Impact, sans-serif' }}>{fmt(shipQuote.enclosed)}</div>
                            <div className="text-[11px] text-slate-300 uppercase tracking-wider mt-0.5">Est. total</div>
                          </div>
                        </div>
                        <div className="grid grid-cols-2 gap-x-4 gap-y-1 mt-3 text-xs text-slate-200">
                          <div className="flex items-center gap-1.5"><Check size={12} style={{ color: C.redBright }} /> {shipQuote.encDays} days transit</div>
                          <div className="flex items-center gap-1.5"><Check size={12} style={{ color: C.redBright }} /> Climate-controlled trailer</div>
                          <div className="flex items-center gap-1.5"><Check size={12} style={{ color: C.redBright }} /> $500k cargo insurance</div>
                          <div className="flex items-center gap-1.5"><Check size={12} style={{ color: C.redBright }} /> Soft tie-downs & lift-gate</div>
                          <div className="flex items-center gap-1.5"><Check size={12} style={{ color: C.redBright }} /> Single-car load priority</div>
                          <div className="flex items-center gap-1.5"><Check size={12} style={{ color: C.redBright }} /> GPS-tracked</div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center justify-between text-xs text-slate-500 px-2">
                    <div>≈ {shipQuote.distance.toLocaleString()} mi from Windsor, CA (95492)</div>
                    <button onClick={() => goTo('contact')} className="font-bold uppercase tracking-wide hover:underline" style={{ color: C.red }}>Book transport →</button>
                  </div>
                </div>
              ) : (
                <div className="h-full min-h-[380px] flex items-center justify-center p-8 rounded-lg" style={{ background: C.cream, border: `2px dashed ${C.silver}` }}>
                  <div className="text-center">
                    <div className="w-16 h-16 rounded-full mx-auto mb-4 flex items-center justify-center" style={{ background: 'white', border: `2px solid ${C.silver}` }}><Truck size={28} style={{ color: C.gray }} /></div>
                    <div className="font-black uppercase tracking-wide text-lg mb-1" style={{ fontFamily: 'Impact, sans-serif', color: C.charcoal }}>Ready For A Quote</div>
                    <div className="text-sm text-slate-500 max-w-xs">Enter your destination ZIP to see open and enclosed transport options.</div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* GALLERY */}
      <section id="gallery" className="py-16 md:py-20 px-6" style={{ background: `linear-gradient(180deg, white 0%, ${C.cream} 100%)` }}>
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <div className="inline-block px-4 py-1 rounded-full text-xs font-black uppercase tracking-widest mb-4" style={{ background: C.red, color: 'white' }}>Gallery</div>
            <h2 className="text-4xl md:text-5xl font-black" style={{ fontFamily: 'Impact, sans-serif', color: C.charcoal }}>WALL OF COBRAS</h2>
            <div className="w-16 h-1 mx-auto mt-4" style={{ background: C.red }} />
            <p className="text-slate-600 mt-4 max-w-2xl mx-auto">Cars restored, delivered, and displayed at our Windsor shop. Click any photo to view larger.</p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 md:gap-4">
            {[
              { url: 'https://commons.wikimedia.org/wiki/Special:FilePath/Shelby_AC_427_Cobra_vl_blue.jpg?width=1200', title: '427 Cobra', caption: 'Guardsman Blue / white stripes', span: 'lg:col-span-2 lg:row-span-2' },
              { url: 'https://commons.wikimedia.org/wiki/Special:FilePath/1964_Shelby_Cobra_Slalom_Snake.jpg?width=1200', title: 'CSX2537 Slalom Snake', caption: 'White with red stripes' },
              { url: 'https://commons.wikimedia.org/wiki/Special:FilePath/Shelby_Daytona_Coupe_black_and_silver.JPG?width=1200', title: 'Daytona Coupe', caption: 'Black over silver — CSX9000 spec' },
              { url: 'https://commons.wikimedia.org/wiki/Special:FilePath/1968_Shelby_GT350.JPG?width=1200', title: '1968 Shelby GT350', caption: 'Restored fastback' },
              { url: 'https://commons.wikimedia.org/wiki/Special:FilePath/1969_red_Shelby_Mustang_GT350_side.JPG?width=1200', title: '1969 GT350', caption: 'Candy-apple red survivor' },
              { url: 'https://commons.wikimedia.org/wiki/Special:FilePath/AC-Cobra-MKII.jpg?width=1200', title: 'AC Cobra MkII', caption: '289 small-block / wire wheels' },
              { url: 'https://commons.wikimedia.org/wiki/Special:FilePath/Shelby_Mustang_GT350_1966.jpg?width=1200', title: '1966 GT350', caption: 'Wimbledon White / Guardsman stripes' },
            ].map((photo, i) => {
              const errored = imgErrors[i];
              return (
                <button key={i} onClick={() => setLightbox(photo)} className={`relative rounded-lg overflow-hidden group aspect-[4/3] hover:shadow-2xl transition ${photo.span || ''}`} style={{ background: `linear-gradient(135deg, ${C.blueDark}, ${C.blueMid})`, border: `2px solid ${C.silver}` }}>
                  {!errored ? (
                    <img src={photo.url} alt={photo.title} loading="lazy" onError={() => setImgErrors(prev => ({ ...prev, [i]: true }))} className="w-full h-full object-cover transition duration-500 group-hover:scale-105" />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center"><Car size={72} color="white" strokeWidth={1.2} style={{ opacity: 0.85 }} /></div>
                  )}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent" />
                  <div className="absolute bottom-0 left-0 right-0 p-3 md:p-4 text-left">
                    <div className="text-white font-black text-base md:text-lg uppercase tracking-wide leading-tight" style={{ fontFamily: 'Impact, sans-serif', textShadow: '0 1px 4px rgba(0,0,0,0.8)' }}>{photo.title}</div>
                    <div className="text-xs text-slate-200 mt-0.5" style={{ textShadow: '0 1px 3px rgba(0,0,0,0.9)' }}>{photo.caption}</div>
                  </div>
                </button>
              );
            })}
          </div>
        </div>
      </section>

      {/* HISTORY */}
      <section id="history" className="py-16 md:py-24 px-6 bg-white">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-12">
            <div className="inline-block px-4 py-1 rounded-full text-xs font-black uppercase tracking-widest mb-4" style={{ background: C.red, color: 'white' }}>Our Story</div>
            <h2 className="text-4xl md:text-5xl font-black" style={{ fontFamily: 'Impact, sans-serif', color: C.charcoal }}>WHAT BEGAN AS A PASSION</h2>
            <div className="w-16 h-1 mx-auto mt-4" style={{ background: C.red }} />
          </div>
          <div className="text-slate-700 leading-relaxed text-lg space-y-6">
            <p>DenBeste Motorsports was founded by <strong>Bill DenBeste in 2008</strong> in Windsor, California. What began as a personal collection of American muscle and a lifelong friendship with Carroll Shelby grew into one of the most respected Shelby Cobra dealerships in the world.</p>
            <p>Bill's close relationship with Carroll Shelby gave DenBeste Motorsports direct access to the Shelby continuation programs — and today the company is the <strong>go-to source for CSX1000, CSX4000/6000, CSX7000, CSX8000, and CSX9000 Daytona Coupes</strong>, as well as CS GT40 continuation cars. Every car sold through DenBeste carries official Shelby American documentation.</p>
            <p>Beyond finished cars, DenBeste runs the <strong>Shelby Engine Company</strong>, hand-building all-aluminum FE, Windsor, and 289 crate motors out of the Windsor shop.</p>
            <p>Bill's passion for racing extends beyond Shelby history. He's been directly involved in NASCAR as a team co-owner, working with drivers including <strong>Boris Said, David Ragan, and Aric Almirola</strong>.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-12">
            {[
              { Icon: Flag, title: 'Founded 2008', sub: 'Windsor, California' },
              { Icon: Award, title: 'Friend of Shelby', sub: 'Direct CSX dealer authority' },
              { Icon: Trophy, title: 'NASCAR Heritage', sub: 'Active team ownership' },
            ].map(({ Icon, title, sub }, i) => (
              <div key={i} className="p-6 rounded-lg text-center" style={{ background: C.cream, border: `2px solid ${C.silver}` }}>
                <Icon size={36} color={C.red} className="mx-auto mb-3" />
                <div className="font-black text-lg" style={{ color: C.charcoal }}>{title}</div>
                <div className="text-sm text-slate-600 mt-1">{sub}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CONTACT */}
      <section id="contact" className="py-16 md:py-20 px-6" style={{ background: `linear-gradient(135deg, ${C.blueDark}, ${C.blue})` }}>
        <div className="max-w-5xl mx-auto text-white">
          <div className="text-center mb-12">
            <div className="inline-block px-4 py-1 rounded-full text-xs font-black uppercase tracking-widest mb-4" style={{ background: C.red, color: 'white' }}>Visit</div>
            <h2 className="text-4xl md:text-5xl font-black" style={{ fontFamily: 'Impact, sans-serif' }}>COME SEE US</h2>
            <div className="w-16 h-1 mx-auto mt-4" style={{ background: C.red }} />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {[
              { Icon: MapPin, title: 'Shop Location', lines: ['810 DenBeste Court, Ste 107', 'Windsor, CA 95492'] },
              { Icon: Phone, title: 'Call', lines: ['(707) 555-0100', 'Mon–Fri 8am–5pm PT'] },
              { Icon: Mail, title: 'Email', lines: ['sales@denbestemotorsports.com', 'parts@denbestemotorsports.com'] },
              { Icon: Clock, title: 'Shop Tours', lines: ['By appointment only', 'Wall of Cobras on display'] },
            ].map(({ Icon, title, lines }, i) => (
              <div key={i} className="p-6 rounded-lg flex items-start gap-4" style={{ background: 'rgba(255,255,255,0.08)', border: '1px solid rgba(255,255,255,0.15)' }}>
                <div className="w-12 h-12 rounded flex-shrink-0 flex items-center justify-center" style={{ background: C.red }}><Icon size={22} color="white" /></div>
                <div>
                  <div className="font-black text-lg uppercase tracking-wide">{title}</div>
                  {lines.map((l, j) => <div key={j} className="text-slate-200 text-sm mt-1">{l}</div>)}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="pt-10 pb-6 px-6" style={{ background: C.charcoal, color: '#94a3b8' }}>
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col items-center text-center">
            <Logo size="sm" />
            <div className="text-xs mt-4 uppercase tracking-widest">© 2026 DenBeste Motorsports • Windsor, California</div>
            <div className="text-xs mt-1 opacity-60">Shelby Engine Company • Authorized CSX Cobra Dealer</div>
          </div>
          <div className="mt-8 pt-6 flex flex-col md:flex-row items-center justify-center gap-x-6 gap-y-2 text-xs uppercase tracking-widest" style={{ borderTop: '1px solid rgba(255,255,255,0.1)' }}>
            <button onClick={() => setPrivacyOpen(true)} className="hover:text-white flex items-center gap-1.5"><Shield size={12} /> Privacy Policy</button>
            <button onClick={() => setCookiesOpen(true)} className="hover:text-white flex items-center gap-1.5"><Cookie size={12} /> Cookies Policy</button>
            <button onClick={() => setTermsOpen(true)} className="hover:text-white flex items-center gap-1.5"><FileText size={12} /> Terms of Sale</button>
            <button onClick={() => goTo('contact')} className="hover:text-white flex items-center gap-1.5"><Mail size={12} /> Contact</button>
            <button onClick={() => { setLoginOpen(true); setLoginError(''); }} className="hover:text-white flex items-center gap-1.5 opacity-50 hover:opacity-100"><Lock size={12} /> Admin</button>
          </div>
        </div>
      </footer>

      {/* ALL MODALS */}
      {loginOpen && (
        <Modal onClose={() => setLoginOpen(false)}>
          <div className="p-6 md:p-8">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 rounded-full flex items-center justify-center" style={{ background: C.charcoal }}><Lock size={20} color="white" /></div>
              <div>
                <h3 className="text-2xl font-black leading-tight" style={{ fontFamily: 'Impact, sans-serif', color: C.charcoal }}>ADMIN SIGN IN</h3>
                <div className="text-xs text-slate-500">Authorized personnel only</div>
              </div>
            </div>
            <div className="p-3 rounded text-xs mb-4" style={{ background: '#fef3c7', color: '#92400e', border: '1px solid #fcd34d' }}>
              <strong>Demo credentials:</strong> {ADMIN_EMAIL} / {ADMIN_PASSWORD}
            </div>
            <label className="block text-xs uppercase tracking-widest font-bold mb-1.5" style={{ color: C.gray }}>Email</label>
            <input type="email" value={loginEmail} onChange={(e) => { setLoginEmail(e.target.value); setLoginError(''); }} onKeyDown={(e) => e.key === 'Enter' && doLogin()} className="w-full px-3 py-2.5 rounded border text-sm mb-3" style={{ borderColor: loginError ? C.red : C.silver }} />
            <label className="block text-xs uppercase tracking-widest font-bold mb-1.5" style={{ color: C.gray }}>Password</label>
            <div className="relative mb-3">
              <input type={showPass ? 'text' : 'password'} value={loginPass} onChange={(e) => { setLoginPass(e.target.value); setLoginError(''); }} onKeyDown={(e) => e.key === 'Enter' && doLogin()} className="w-full px-3 py-2.5 rounded border text-sm pr-10" style={{ borderColor: loginError ? C.red : C.silver }} />
              <button onClick={() => setShowPass(!showPass)} className="absolute right-2 top-1/2 -translate-y-1/2 p-1">{showPass ? <EyeOff size={16} color={C.gray} /> : <Eye size={16} color={C.gray} />}</button>
            </div>
            {loginError && <div className="text-xs mb-3 flex items-center gap-1.5" style={{ color: C.red }}><AlertCircle size={12} /> {loginError}</div>}
            <button onClick={doLogin} className="w-full py-3 rounded font-black uppercase tracking-wider text-white hover:opacity-90 flex items-center justify-center gap-2" style={{ background: C.red }}>
              <Lock size={16} /> Sign In
            </button>
            <div className="text-[11px] text-slate-500 mt-3 text-center">For a real deployment this would require 2FA and secure backend authentication.</div>
          </div>
        </Modal>
      )}

      {productModal && (
        <Modal onClose={() => setProductModal(null)}>
          <div className="grid md:grid-cols-2">
            <div className="h-64 md:h-auto md:min-h-[400px]"><PartIcon cat={productModal.cat} /></div>
            <div className="p-6 md:p-8">
              <div className="flex items-center gap-2 mb-2">
                <div className="text-xs uppercase tracking-widest font-bold" style={{ color: C.red }}>{CATS.find(c => c.id === productModal.cat)?.label}</div>
                {productModal.sub && (productModal.cat === 'cobra' || productModal.cat === 'mustang') && <div className="text-xs uppercase font-bold px-2 py-0.5 rounded-full" style={{ background: C.cream, color: C.gray, border: `1px solid ${C.silver}` }}>{SUBS.find(s => s.id === productModal.sub)?.label}</div>}
              </div>
              <h3 className="text-2xl md:text-3xl font-black mb-3 leading-tight" style={{ color: C.charcoal, fontFamily: 'Impact, sans-serif' }}>{productModal.name}</h3>
              <div className="text-3xl font-black mb-4" style={{ color: C.blueDark, fontFamily: 'Impact, sans-serif' }}>{fmt(productModal.price)}</div>
              <p className="text-slate-700 mb-4 leading-relaxed">{productModal.desc}</p>
              <div className="mb-6">
                <div className="text-xs uppercase tracking-widest font-bold mb-2" style={{ color: C.charcoal }}>Specs</div>
                <ul className="space-y-1">{(productModal.specs || []).map((s, i) => <li key={i} className="text-sm text-slate-600 flex items-start gap-2"><Check size={16} className="mt-0.5 flex-shrink-0" style={{ color: C.red }} /> {s}</li>)}</ul>
              </div>
              <div className="text-xs text-slate-500 mb-4">{productModal.stock} in stock • Ships from Windsor, CA</div>
              <div className="flex gap-2">
                <button onClick={() => { addToCart(productModal); setProductModal(null); setCartOpen(true); }} className="flex-1 py-3 rounded font-black uppercase tracking-wider text-white hover:opacity-90 flex items-center justify-center gap-2" style={{ background: C.red }}><ShoppingCart size={18} /> Add to Cart</button>
                <button onClick={() => share(productModal, 'parts')} className="px-4 py-3 rounded font-black hover:opacity-90" style={{ background: C.cream, color: C.charcoal, border: `2px solid ${C.silver}` }}><Share2 size={18} /></button>
              </div>
            </div>
          </div>
        </Modal>
      )}

      {carModal && (
        <Modal onClose={() => setCarModal(null)}>
          <div className="h-64"><CarIllustration idx={cars.indexOf(carModal)} /></div>
          <div className="p-6 md:p-8">
            <div className="text-xs uppercase tracking-widest font-bold mb-2" style={{ color: C.red }}>{carModal.year} • DenBeste Inventory</div>
            <h3 className="text-2xl md:text-3xl font-black mb-2 leading-tight" style={{ color: C.charcoal, fontFamily: 'Impact, sans-serif' }}>{carModal.name}</h3>
            <p className="text-slate-600 mb-4">{carModal.tagline}</p>
            <div className="text-4xl font-black mb-6" style={{ color: C.blueDark, fontFamily: 'Impact, sans-serif' }}>{fmt(carModal.price)}</div>
            <p className="text-slate-700 mb-6 leading-relaxed">{carModal.desc}</p>
            <div className="mb-6 grid grid-cols-1 sm:grid-cols-2 gap-2">{(carModal.specs || []).map((s, i) => <div key={i} className="text-sm text-slate-700 flex items-start gap-2 p-2 rounded" style={{ background: C.cream }}><Check size={14} className="mt-0.5 flex-shrink-0" style={{ color: C.red }} /> {s}</div>)}</div>
            <div className="flex gap-2">
              <button onClick={() => { setInquiryCar(carModal); setCarModal(null); }} className="flex-1 py-3 rounded font-black uppercase tracking-wider text-white hover:opacity-90" style={{ background: C.blue }}>Inquire About This Car</button>
              <button onClick={() => share(carModal, 'cars')} className="px-4 py-3 rounded font-black hover:opacity-90" style={{ background: C.cream, color: C.charcoal, border: `2px solid ${C.silver}` }}><Share2 size={18} /></button>
            </div>
          </div>
        </Modal>
      )}

      {inquiryCar && !inquirySent && (
        <Modal onClose={() => setInquiryCar(null)}>
          <div className="p-6 md:p-8">
            <h3 className="text-2xl font-black mb-1" style={{ fontFamily: 'Impact, sans-serif', color: C.charcoal }}>INQUIRE ABOUT</h3>
            <div className="text-lg font-bold mb-6" style={{ color: C.blueDark }}>{inquiryCar.name}</div>
            <div className="space-y-3">
              <input placeholder="Full Name" className="w-full px-4 py-2 rounded border text-sm" style={{ borderColor: C.silver }} />
              <input placeholder="Email" type="email" className="w-full px-4 py-2 rounded border text-sm" style={{ borderColor: C.silver }} />
              <input placeholder="Phone" type="tel" className="w-full px-4 py-2 rounded border text-sm" style={{ borderColor: C.silver }} />
              <textarea placeholder="Questions or offer details" rows={4} className="w-full px-4 py-2 rounded border text-sm" style={{ borderColor: C.silver }} defaultValue={`I'm interested in the ${inquiryCar.name}. Please contact me with additional information.`} />
            </div>
            <button onClick={() => setInquirySent(true)} className="w-full mt-4 py-3 rounded font-black uppercase tracking-wider text-white hover:opacity-90" style={{ background: C.red }}>Send Inquiry</button>
          </div>
        </Modal>
      )}

      {inquirySent && (
        <Modal onClose={() => { setInquirySent(false); setInquiryCar(null); }}>
          <div className="p-8 text-center">
            <div className="w-16 h-16 rounded-full mx-auto flex items-center justify-center mb-4" style={{ background: C.red }}><Check size={32} color="white" /></div>
            <h3 className="text-2xl font-black mb-2" style={{ fontFamily: 'Impact, sans-serif', color: C.charcoal }}>INQUIRY SENT</h3>
            <p className="text-slate-600 mb-6">A DenBeste team member will contact you within one business day.</p>
            <button onClick={() => { setInquirySent(false); setInquiryCar(null); }} className="px-6 py-2.5 rounded font-bold uppercase tracking-wide text-white" style={{ background: C.blue }}>Close</button>
          </div>
        </Modal>
      )}

      {cartOpen && (
        <div className="fixed inset-0 z-50 flex justify-end" style={{ background: 'rgba(0,0,0,0.5)' }} onClick={() => setCartOpen(false)}>
          <div className="bg-white w-full max-w-md h-full flex flex-col" onClick={e => e.stopPropagation()}>
            <div className="p-5 flex items-center justify-between border-b-4" style={{ borderColor: C.red, background: C.blueDark, color: 'white' }}>
              <h3 className="font-black text-xl uppercase tracking-wide" style={{ fontFamily: 'Impact, sans-serif' }}>Your Cart</h3>
              <button onClick={() => setCartOpen(false)}><X size={24} /></button>
            </div>
            <div className="flex-1 overflow-y-auto p-5">
              {cart.length === 0 ? (
                <div className="text-center py-16">
                  <ShoppingCart size={48} className="mx-auto mb-3" style={{ color: C.silver }} />
                  <p className="text-slate-500">Your cart is empty</p>
                  <button onClick={() => { setCartOpen(false); goTo('shop'); }} className="mt-4 px-5 py-2 rounded font-bold text-sm text-white" style={{ background: C.red }}>Shop Parts</button>
                </div>
              ) : (
                <div className="space-y-3">
                  {cart.map(item => (
                    <div key={item.id} className="flex gap-3 pb-3" style={{ borderBottom: `1px solid ${C.silver}` }}>
                      <div className="w-20 h-20 flex-shrink-0 rounded overflow-hidden"><PartIcon cat={item.cat} /></div>
                      <div className="flex-1">
                        <div className="font-bold text-sm leading-tight mb-1">{item.name}</div>
                        <div className="text-sm font-black" style={{ color: C.blueDark }}>{fmt(item.price)}</div>
                        <div className="flex items-center gap-2 mt-2">
                          <button onClick={() => changeQty(item.id, -1)} className="w-7 h-7 rounded flex items-center justify-center" style={{ background: C.cream, border: `1px solid ${C.silver}` }}><Minus size={12} /></button>
                          <span className="font-bold text-sm w-6 text-center">{item.qty}</span>
                          <button onClick={() => changeQty(item.id, 1)} className="w-7 h-7 rounded flex items-center justify-center" style={{ background: C.cream, border: `1px solid ${C.silver}` }}><Plus size={12} /></button>
                          <button onClick={() => removeFromCart(item.id)} className="ml-auto text-xs text-slate-500 hover:text-red-600">Remove</button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
            {cart.length > 0 && (
              <div className="p-5 border-t" style={{ borderColor: C.silver, background: C.cream }}>
                <div className="flex justify-between mb-1 text-sm text-slate-600"><span>Subtotal</span><span>{fmt(cartTotal)}</span></div>
                <div className="flex justify-between mb-4 text-sm text-slate-600"><span>Shipping</span><span>Calculated at checkout</span></div>
                <div className="flex justify-between mb-5 text-xl font-black"><span>Total</span><span style={{ color: C.blueDark, fontFamily: 'Impact, sans-serif' }}>{fmt(cartTotal)}</span></div>
                <button onClick={() => { setCartOpen(false); setCheckoutOpen(true); }} className="w-full py-3 rounded font-black uppercase tracking-wider text-white hover:opacity-90" style={{ background: C.red }}>Checkout</button>
              </div>
            )}
          </div>
        </div>
      )}

      {checkoutOpen && !orderDone && (
        <Modal onClose={() => setCheckoutOpen(false)}>
          <div className="p-6 md:p-8 max-h-[90vh] overflow-y-auto">
            <h3 className="text-2xl md:text-3xl font-black mb-1" style={{ fontFamily: 'Impact, sans-serif', color: C.charcoal }}>CHECKOUT</h3>
            <div className="text-sm text-slate-600 mb-6">Shipping information</div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-4">
              <input placeholder="First Name" className="px-4 py-2 rounded border text-sm" style={{ borderColor: C.silver }} />
              <input placeholder="Last Name" className="px-4 py-2 rounded border text-sm" style={{ borderColor: C.silver }} />
              <input placeholder="Email" className="px-4 py-2 rounded border text-sm sm:col-span-2" style={{ borderColor: C.silver }} />
              <input placeholder="Address" className="px-4 py-2 rounded border text-sm sm:col-span-2" style={{ borderColor: C.silver }} />
              <input placeholder="City" className="px-4 py-2 rounded border text-sm" style={{ borderColor: C.silver }} />
              <input placeholder="State / ZIP" className="px-4 py-2 rounded border text-sm" style={{ borderColor: C.silver }} />
            </div>
            <div className="text-sm text-slate-600 mb-3 mt-4 font-bold uppercase tracking-wide">Payment</div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-6">
              <input placeholder="Card Number" className="px-4 py-2 rounded border text-sm sm:col-span-2" style={{ borderColor: C.silver }} />
              <input placeholder="MM/YY" className="px-4 py-2 rounded border text-sm" style={{ borderColor: C.silver }} />
              <input placeholder="CVV" className="px-4 py-2 rounded border text-sm" style={{ borderColor: C.silver }} />
            </div>
            <div className="p-4 rounded mb-4" style={{ background: C.cream }}>
              <div className="text-xs uppercase tracking-widest font-bold mb-2" style={{ color: C.charcoal }}>Order Summary</div>
              {cart.map(i => <div key={i.id} className="flex justify-between text-sm py-1"><span className="truncate pr-2">{i.qty} × {i.name}</span><span className="font-bold flex-shrink-0">{fmt(i.price * i.qty)}</span></div>)}
              <div className="flex justify-between mt-2 pt-2 border-t font-black text-lg" style={{ borderColor: C.silver, color: C.blueDark }}><span>Total</span><span style={{ fontFamily: 'Impact, sans-serif' }}>{fmt(cartTotal)}</span></div>
            </div>
            <button onClick={() => {
              // Decrement stock and track sold count for each purchased item
              updateParts(parts.map(p => {
                const item = cart.find(i => i.id === p.id);
                if (!item) return p;
                return { ...p, stock: Math.max(0, (p.stock || 0) - item.qty), sold: (p.sold || 0) + item.qty };
              }));
              // Log the sale as a new order
              const now = new Date();
              const orderId = `DBM-${now.getFullYear()}${String(now.getMonth()+1).padStart(2,'0')}${String(now.getDate()).padStart(2,'0')}-${String(Math.floor(Math.random()*9000)+1000)}`;
              updateOrders([{
                id: orderId,
                customer: 'Online Customer',
                email: 'customer@checkout.com',
                items: cart.map(i => `${i.qty}× ${i.name}`).join(', '),
                total: cartTotal,
                status: 'processing',
                date: now.toISOString().slice(0, 10),
              }, ...orders]);
              setOrderDone(true);
              setCart([]);
            }} className="w-full py-3 rounded font-black uppercase tracking-wider text-white hover:opacity-90" style={{ background: C.red }}>Place Order • {fmt(cartTotal)}</button>
          </div>
        </Modal>
      )}

      {orderDone && (
        <Modal onClose={() => { setOrderDone(false); setCheckoutOpen(false); }}>
          <div className="p-8 text-center">
            <div className="w-20 h-20 rounded-full mx-auto flex items-center justify-center mb-4" style={{ background: C.red }}><Check size={40} color="white" /></div>
            <h3 className="text-3xl font-black mb-2" style={{ fontFamily: 'Impact, sans-serif', color: C.charcoal }}>ORDER CONFIRMED</h3>
            <p className="text-slate-600 mb-2">Thanks for the order.</p>
            <p className="text-sm text-slate-500 mb-6">Parts ship from Windsor, CA within 1–3 business days.</p>
            <button onClick={() => { setOrderDone(false); setCheckoutOpen(false); }} className="px-6 py-2.5 rounded font-bold uppercase tracking-wide text-white" style={{ background: C.blue }}>Keep Shopping</button>
          </div>
        </Modal>
      )}

      {privacyOpen && (
        <Modal onClose={() => setPrivacyOpen(false)}>
          <div className="p-6 md:p-8 max-h-[85vh] overflow-y-auto">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 rounded-full flex items-center justify-center" style={{ background: C.red }}><Shield size={22} color="white" /></div>
              <div><h3 className="text-2xl font-black leading-tight" style={{ fontFamily: 'Impact, sans-serif', color: C.charcoal }}>PRIVACY POLICY</h3><div className="text-xs text-slate-500 uppercase tracking-widest">Effective April 22, 2026</div></div>
            </div>
            <div className="space-y-4 text-sm text-slate-700 leading-relaxed">
              <p>DenBeste Motorsports LLC respects your privacy. This policy explains what information we collect, how we use it, and the choices you have.</p>
              <h4 className="font-black uppercase tracking-wide text-sm mt-4">Information We Collect</h4>
              <p>When you place an order or submit an inquiry, we collect your name, shipping and billing address, email, phone, and payment information.</p>
              <h4 className="font-black uppercase tracking-wide text-sm mt-4">How We Use It</h4>
              <p>We use your information to process orders, arrange shipping, respond to questions, and send order updates.</p>
              <h4 className="font-black uppercase tracking-wide text-sm mt-4">Information Sharing</h4>
              <p>We never sell your personal information. We share it only with vendors we rely on to run the business — payment processors, shipping carriers, and tax authorities where required.</p>
              <h4 className="font-black uppercase tracking-wide text-sm mt-4">Your Rights</h4>
              <p>You have the right to access, correct, or request deletion of your personal data. California residents have additional rights under the CCPA. Email <strong>privacy@denbestemotorsports.com</strong>.</p>
              <h4 className="font-black uppercase tracking-wide text-sm mt-4">Contact</h4>
              <p>DenBeste Motorsports LLC<br />810 DenBeste Court, Ste 107, Windsor, CA 95492</p>
            </div>
            <button onClick={() => setPrivacyOpen(false)} className="w-full mt-6 py-3 rounded font-black uppercase tracking-wider text-white" style={{ background: C.blue }}>Close</button>
          </div>
        </Modal>
      )}

      {cookiesOpen && (
        <Modal onClose={() => setCookiesOpen(false)}>
          <div className="p-6 md:p-8 max-h-[85vh] overflow-y-auto">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 rounded-full flex items-center justify-center" style={{ background: C.red }}><Cookie size={22} color="white" /></div>
              <div><h3 className="text-2xl font-black leading-tight" style={{ fontFamily: 'Impact, sans-serif', color: C.charcoal }}>COOKIES POLICY</h3><div className="text-xs text-slate-500 uppercase tracking-widest">Effective April 22, 2026</div></div>
            </div>
            <div className="space-y-4 text-sm text-slate-700 leading-relaxed">
              <p>DenBeste Motorsports uses cookies to make the site work properly and understand performance.</p>
              <h4 className="font-black uppercase tracking-wide text-sm mt-4">Essential Cookies</h4>
              <p>Required for the site to function — shopping cart, login session, checkout security. Cannot be disabled.</p>
              <h4 className="font-black uppercase tracking-wide text-sm mt-4">Analytics Cookies</h4>
              <p>Help us understand how visitors use the site. Data is aggregated.</p>
              <h4 className="font-black uppercase tracking-wide text-sm mt-4">Managing Cookies</h4>
              <p>Disable cookies in your browser settings, but some features including the cart will not work.</p>
            </div>
            <button onClick={() => setCookiesOpen(false)} className="w-full mt-6 py-3 rounded font-black uppercase tracking-wider text-white" style={{ background: C.blue }}>Close</button>
          </div>
        </Modal>
      )}

      {termsOpen && (
        <Modal onClose={() => setTermsOpen(false)}>
          <div className="p-6 md:p-8 max-h-[85vh] overflow-y-auto">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 rounded-full flex items-center justify-center" style={{ background: C.red }}><FileText size={22} color="white" /></div>
              <div><h3 className="text-2xl font-black leading-tight" style={{ fontFamily: 'Impact, sans-serif', color: C.charcoal }}>TERMS OF SALE</h3><div className="text-xs text-slate-500 uppercase tracking-widest">Effective April 22, 2026</div></div>
            </div>
            <div className="space-y-4 text-sm text-slate-700 leading-relaxed">
              <h4 className="font-black uppercase tracking-wide text-sm">Orders & Payment</h4>
              <p>All orders subject to acceptance and availability. Payment due in full at time of order for parts. Car purchases require deposit.</p>
              <h4 className="font-black uppercase tracking-wide text-sm">Shipping</h4>
              <p>Parts ship from Windsor, CA within 1–3 business days.</p>
              <h4 className="font-black uppercase tracking-wide text-sm">Returns</h4>
              <p>Stock parts returnable within 30 days, unused, less 15% restocking fee. Custom-built engines non-returnable.</p>
              <h4 className="font-black uppercase tracking-wide text-sm">Warranty</h4>
              <p>Shelby Engine Company crate motors carry limited 12-month / 12,000-mile warranty.</p>
              <h4 className="font-black uppercase tracking-wide text-sm">Governing Law</h4>
              <p>Governed by the laws of California. Disputes resolved in Sonoma County.</p>
            </div>
            <button onClick={() => setTermsOpen(false)} className="w-full mt-6 py-3 rounded font-black uppercase tracking-wider text-white" style={{ background: C.blue }}>Close</button>
          </div>
        </Modal>
      )}

      {lightbox && (
        <div onClick={() => setLightbox(null)} className="fixed inset-0 z-[55] flex items-center justify-center p-4 cursor-pointer" style={{ background: 'rgba(0,0,0,0.92)' }}>
          <button onClick={() => setLightbox(null)} className="absolute top-4 right-4 w-11 h-11 rounded-full flex items-center justify-center z-10" style={{ background: 'rgba(255,255,255,0.15)', color: 'white', border: '1.5px solid rgba(255,255,255,0.3)' }}><X size={22} /></button>
          <div className="max-w-5xl w-full" onClick={(e) => e.stopPropagation()}>
            <img src={lightbox.url} alt={lightbox.title} onError={(e) => { e.target.style.display = 'none'; }} className="w-full h-auto max-h-[80vh] object-contain rounded-lg" />
            <div className="text-center mt-4">
              <div className="text-white font-black text-2xl uppercase tracking-wide" style={{ fontFamily: 'Impact, sans-serif' }}>{lightbox.title}</div>
              <div className="text-slate-300 text-sm mt-1">{lightbox.caption}</div>
            </div>
          </div>
        </div>
      )}

      {showCookieBanner && (
        <div className="fixed bottom-0 left-0 right-0 z-40 p-4 md:p-5 shadow-2xl" style={{ background: C.charcoal, borderTop: `4px solid ${C.red}` }}>
          <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-start md:items-center gap-4">
            <div className="flex items-start gap-3 flex-1">
              <div className="w-10 h-10 rounded-full flex-shrink-0 flex items-center justify-center" style={{ background: C.red }}><Cookie size={20} color="white" /></div>
              <div className="text-white text-sm">
                <div className="font-black uppercase tracking-wide mb-1" style={{ fontFamily: 'Impact, sans-serif', fontSize: '1rem' }}>We Use Cookies</div>
                <div className="text-slate-300 text-xs leading-relaxed">DenBeste uses cookies to keep your cart working and understand site performance.{' '}<button onClick={() => setCookiesOpen(true)} className="underline hover:text-white">Learn more</button>.</div>
              </div>
            </div>
            <div className="flex gap-2 w-full md:w-auto flex-shrink-0">
              <button onClick={dismissCookies} className="flex-1 md:flex-none px-4 py-2.5 rounded text-xs font-black uppercase tracking-wider" style={{ background: 'rgba(255,255,255,0.08)', color: 'white', border: '1.5px solid rgba(255,255,255,0.25)' }}>Essential Only</button>
              <button onClick={dismissCookies} className="flex-1 md:flex-none px-5 py-2.5 rounded text-xs font-black uppercase tracking-wider text-white hover:opacity-90" style={{ background: C.red }}>Accept All</button>
            </div>
          </div>
        </div>
      )}

      {toast && (
        <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-[60] px-5 py-3 rounded-lg shadow-2xl flex items-center gap-2 text-sm font-bold" style={{ background: C.charcoal, color: 'white', border: `2px solid ${C.red}` }}>
          <Check size={16} style={{ color: C.red }} /> {toast}
        </div>
      )}
    </div>
  );
}

function StatusPill({ status }) {
  const styles = {
    processing: { bg: '#fef3c7', color: '#92400e' },
    shipped: { bg: '#dbeafe', color: '#1e40af' },
    delivered: { bg: '#dcfce7', color: '#166534' },
    cancelled: { bg: '#fee2e2', color: '#991b1b' },
  };
  const s = styles[status] || styles.processing;
  return <span className="inline-block px-2 py-0.5 rounded text-[10px] font-black uppercase tracking-wider mt-1" style={{ background: s.bg, color: s.color }}>{status}</span>;
}

function Modal({ children, onClose }) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4" style={{ background: 'rgba(0,0,0,0.6)' }} onClick={onClose}>
      <div className="bg-white rounded-lg max-w-3xl w-full max-h-[90vh] overflow-y-auto relative" onClick={e => e.stopPropagation()}>
        <button onClick={onClose} className="absolute top-3 right-3 z-10 w-9 h-9 rounded-full flex items-center justify-center hover:opacity-80" style={{ background: 'rgba(15,23,42,0.9)', color: 'white' }}><X size={18} /></button>
        {children}
      </div>
    </div>
  );
}

function classifyPart(text) {
  const t = text.toLowerCase();

  // Category detection — most specific first
  const catPatterns = {
    memorabilia: ['autograph', 'signed photo', 'signed edition', 'grille badge', 'registry', 'certificate', 'poster', 'art print', 'hardcover', 'commemorative'],
    crate: ['crate motor', 'crate engine', 'complete engine', 'turnkey', 'turn-key', 'all-aluminum crate', 'dyno-tested', 'dyno tested', 'stroker motor'],
    blocks: ['bare block', 'bare aluminum block', 'aluminum block', 'cylinder head', 'aluminum heads', 'short block', 'long block'],
    mustang: ['mustang', 'gt350', 'gt500', 'fastback', 'shelby gt350', 'shelby gt500'],
  };

  let cat = 'cobra'; // default — Cobra is the flagship category
  for (const [c, patterns] of Object.entries(catPatterns)) {
    if (patterns.some(p => t.includes(p))) { cat = c; break; }
  }

  // Categories without subcategories
  if (cat === 'memorabilia') return { cat, sub: null };
  if (cat === 'crate' || cat === 'blocks') return { cat, sub: 'engine' };

  // Subcategory detection — ordered so specific wins over general
  const subPatterns = {
    drivetrain: ['transmission', 'gearbox', 'top-loader', 'toploader', 'tremec', 'differential', 'rear end', 'clutch', 'flywheel', 'driveshaft', 'salisbury', '4-speed', '5-speed', 'ring and pinion', '9" rear'],
    electrical: ['wiring', 'harness', 'flasher relay', 'ignition coil', 'distributor', 'pertronix', 'alternator', 'starter motor', 'battery', 'headlight', 'tail light', 'electronic ignition'],
    brakes: ['brake', 'caliper', 'rotor', 'braided line', 'girling', 'kelsey', 'master cylinder', 'disc brake', 'drum brake'],
    suspension: ['shock', 'coil spring', 'leaf spring', 'sway bar', 'anti-roll', 'a-arm', 'control arm', 'koni', 'export brace', 'monte carlo', 'tie rod', 'ball joint'],
    interior: ['bucket seat', 'steering wheel', 'dash panel', 'dashboard', 'gauge', 'cluster', 'speedometer', 'tachometer', 'smiths', 'floor mat', 'carpet', 'upholstery', 'shifter', 'rally-pack'],
    body: ['hood', 'fender', 'bumper', 'mirror', 'raydyot', 'grille', 'stripe', 'scoop', 'quarter panel', 'hood pin', 'body panel', 'heat shield', 'le mans'],
    engine: ['carburetor', 'weber', 'holley', 'intake manifold', 'header', 'tri-y', 'exhaust', 'oil pan', 'valve cover', 'camshaft', 'piston', 'crankshaft', 'ida', 'water pump', 'fuel pump', 'radiator', 'hi-rise', 'intake'],
  };

  for (const [s, patterns] of Object.entries(subPatterns)) {
    if (patterns.some(p => t.includes(p))) return { cat, sub: s };
  }

  return { cat, sub: 'engine' }; // sensible default
}

function PartEditor({ part, onSave, onClose }) {
  const [form, setForm] = useState({ ...part, specs: (part.specs || []).join('\n') });
  const isNew = part.id.startsWith('new-');
  const [autoDetect, setAutoDetect] = useState(isNew);
  const [manuallySet, setManuallySet] = useState(false);
  const [detected, setDetected] = useState(null);
  const [error, setError] = useState('');

  // Auto-classify when name or description changes
  useEffect(() => {
    if (!autoDetect || manuallySet) return;
    const text = (form.name + ' ' + form.desc).trim();
    if (text.length < 4) { setDetected(null); return; }
    const result = classifyPart(text);
    setDetected(result);
    setForm(f => {
      if (f.cat === result.cat && f.sub === result.sub) return f;
      return { ...f, cat: result.cat, sub: result.sub };
    });
  }, [form.name, form.desc, autoDetect, manuallySet]);

  const handleSave = () => {
    if (!form.name.trim()) { setError('Name is required'); return; }
    if (form.price < 0 || form.stock < 0) { setError('Price and stock must be 0 or greater'); return; }
    setError('');
    onSave({
      ...form,
      price: Number(form.price) || 0,
      stock: Number(form.stock) || 0,
      specs: form.specs.split('\n').map(s => s.trim()).filter(Boolean),
    });
  };

  const catLabel = CATS.find(c => c.id === form.cat)?.label || 'Cobra Parts';
  const subLabel = SUBS.find(s => s.id === form.sub)?.label || 'Engine';
  const autoActive = autoDetect && !manuallySet;

  return (
    <Modal onClose={onClose}>
      <div className="p-6 md:p-8 max-h-[90vh] overflow-y-auto">
        <h3 className="text-2xl font-black mb-4" style={{ fontFamily: 'Impact, sans-serif', color: C.charcoal }}>{isNew ? 'ADD NEW PART' : 'EDIT PART'}</h3>

        {error && (
          <div className="mb-4 p-3 rounded-lg flex items-center gap-2 text-sm font-bold" style={{ background: '#fef2f2', color: C.redDark, border: `1px solid ${C.red}` }}>
            <AlertCircle size={16} /> {error}
          </div>
        )}

        {/* Auto-categorize toggle */}
        <div className="p-3 rounded-lg mb-4 flex items-start gap-3" style={{ background: autoActive ? '#eff6ff' : C.cream, border: `1.5px solid ${autoActive ? C.blue : C.silver}` }}>
          <input
            type="checkbox"
            id="auto-cat"
            checked={autoDetect}
            onChange={(e) => { setAutoDetect(e.target.checked); setManuallySet(false); }}
            className="mt-1 w-4 h-4 cursor-pointer flex-shrink-0"
            style={{ accentColor: C.blue }}
          />
          <label htmlFor="auto-cat" className="flex-1 text-sm cursor-pointer select-none">
            <div className="font-bold flex items-center gap-2 flex-wrap" style={{ color: C.charcoal }}>
              <span>✨ Auto-Categorize From Name</span>
              {autoActive && detected && (
                <span className="text-xs font-bold px-2 py-0.5 rounded-full" style={{ background: C.blue, color: 'white' }}>
                  → {catLabel}{form.sub && form.cat !== 'memorabilia' ? ' / ' + subLabel : ''}
                </span>
              )}
            </div>
            <div className="text-xs text-slate-600 mt-0.5">
              {autoActive
                ? 'The category and subcategory update automatically as you type. Change a dropdown below to override.'
                : manuallySet
                  ? 'You set the category manually. Re-check this box to re-enable auto-detection.'
                  : 'Turn on to auto-file parts into the correct category on the storefront.'}
            </div>
          </label>
        </div>

        <div className="space-y-4">
          <div>
            <label className="block text-xs uppercase tracking-widest font-bold mb-1" style={{ color: C.gray }}>Name *</label>
            <input type="text" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })}
              className="w-full px-3 py-2 rounded border text-sm" style={{ borderColor: C.silver }}
              placeholder="e.g. Aluminum Intake Manifold 427 FE" />
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="text-xs uppercase tracking-widest font-bold mb-1 flex items-center gap-1.5" style={{ color: C.gray }}>
                Category
                {autoActive && <span className="text-[9px] px-1.5 py-0.5 rounded font-black tracking-wider" style={{ background: C.blue, color: 'white' }}>AUTO</span>}
              </label>
              <select value={form.cat}
                onChange={(e) => { setManuallySet(true); setForm({ ...form, cat: e.target.value }); }}
                className="w-full px-3 py-2 rounded border text-sm"
                style={{ borderColor: autoActive ? C.blue : C.silver, background: autoActive ? '#eff6ff' : 'white' }}>
                {CATS.filter(c => c.id !== 'all').map(c => <option key={c.id} value={c.id}>{c.label}</option>)}
              </select>
            </div>
            <div>
              <label className="text-xs uppercase tracking-widest font-bold mb-1 flex items-center gap-1.5" style={{ color: C.gray }}>
                Subcategory
                {autoActive && <span className="text-[9px] px-1.5 py-0.5 rounded font-black tracking-wider" style={{ background: C.blue, color: 'white' }}>AUTO</span>}
              </label>
              <select value={form.sub || ''}
                onChange={(e) => { setManuallySet(true); setForm({ ...form, sub: e.target.value || null }); }}
                className="w-full px-3 py-2 rounded border text-sm"
                style={{ borderColor: autoActive ? C.blue : C.silver, background: autoActive ? '#eff6ff' : 'white' }}
                disabled={form.cat === 'memorabilia'}>
                <option value="">None</option>
                {SUBS.filter(s => s.id !== 'all').map(s => <option key={s.id} value={s.id}>{s.label}</option>)}
              </select>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs uppercase tracking-widest font-bold mb-1" style={{ color: C.gray }}>Price ($)</label>
              <input type="number" min="0" value={form.price} onChange={(e) => setForm({ ...form, price: e.target.value })} className="w-full px-3 py-2 rounded border text-sm" style={{ borderColor: C.silver }} />
            </div>
            <div>
              <label className="block text-xs uppercase tracking-widest font-bold mb-1" style={{ color: C.gray }}>Stock</label>
              <input type="number" min="0" value={form.stock} onChange={(e) => setForm({ ...form, stock: e.target.value })} className="w-full px-3 py-2 rounded border text-sm" style={{ borderColor: C.silver }} />
            </div>
          </div>
          <div>
            <label className="block text-xs uppercase tracking-widest font-bold mb-1" style={{ color: C.gray }}>Description</label>
            <textarea rows={3} value={form.desc} onChange={(e) => setForm({ ...form, desc: e.target.value })} className="w-full px-3 py-2 rounded border text-sm" style={{ borderColor: C.silver }}
              placeholder="Describe the part — fit, materials, features. Auto-categorize reads this text too." />
          </div>
          <div>
            <label className="block text-xs uppercase tracking-widest font-bold mb-1" style={{ color: C.gray }}>Specs (one per line)</label>
            <textarea rows={4} value={form.specs} onChange={(e) => setForm({ ...form, specs: e.target.value })} className="w-full px-3 py-2 rounded border text-sm font-mono" style={{ borderColor: C.silver }} placeholder="7qt capacity&#10;Windage tray&#10;Pair (L+R)" />
          </div>
        </div>
        <div className="flex gap-2 mt-6">
          <button onClick={onClose} className="flex-1 py-3 rounded font-black uppercase tracking-wider" style={{ background: C.cream, color: C.charcoal, border: `2px solid ${C.silver}` }}>Cancel</button>
          <button onClick={handleSave} className="flex-1 py-3 rounded font-black uppercase tracking-wider text-white hover:opacity-90 flex items-center justify-center gap-2" style={{ background: C.red }}><Save size={16} /> Save</button>
        </div>
      </div>
    </Modal>
  );
}

function CarEditor({ car, onSave, onClose }) {
  const [form, setForm] = useState({ ...car, specs: (car.specs || []).join('\n') });
  const isNew = car.id.startsWith('new-');

  const handleSave = () => {
    if (!form.name.trim()) { alert('Name is required'); return; }
    onSave({
      ...form,
      year: Number(form.year) || new Date().getFullYear(),
      price: Number(form.price) || 0,
      specs: form.specs.split('\n').map(s => s.trim()).filter(Boolean),
    });
  };

  return (
    <Modal onClose={onClose}>
      <div className="p-6 md:p-8 max-h-[90vh] overflow-y-auto">
        <h3 className="text-2xl font-black mb-4" style={{ fontFamily: 'Impact, sans-serif', color: C.charcoal }}>{isNew ? 'ADD NEW CAR' : 'EDIT CAR'}</h3>
        <div className="space-y-4">
          <div>
            <label className="block text-xs uppercase tracking-widest font-bold mb-1" style={{ color: C.gray }}>Name *</label>
            <input type="text" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} className="w-full px-3 py-2 rounded border text-sm" style={{ borderColor: C.silver }} placeholder="e.g. 2022 Shelby CSX8000 Daytona Coupe" />
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs uppercase tracking-widest font-bold mb-1" style={{ color: C.gray }}>Year</label>
              <input type="number" value={form.year} onChange={(e) => setForm({ ...form, year: e.target.value })} className="w-full px-3 py-2 rounded border text-sm" style={{ borderColor: C.silver }} />
            </div>
            <div>
              <label className="block text-xs uppercase tracking-widest font-bold mb-1" style={{ color: C.gray }}>Price ($)</label>
              <input type="number" min="0" value={form.price} onChange={(e) => setForm({ ...form, price: e.target.value })} className="w-full px-3 py-2 rounded border text-sm" style={{ borderColor: C.silver }} />
            </div>
          </div>
          <div>
            <label className="block text-xs uppercase tracking-widest font-bold mb-1" style={{ color: C.gray }}>Tagline</label>
            <input type="text" value={form.tagline} onChange={(e) => setForm({ ...form, tagline: e.target.value })} className="w-full px-3 py-2 rounded border text-sm" style={{ borderColor: C.silver }} placeholder="e.g. 427 FE / 4-speed / 2,400 miles" />
          </div>
          <div>
            <label className="block text-xs uppercase tracking-widest font-bold mb-1" style={{ color: C.gray }}>Description</label>
            <textarea rows={4} value={form.desc} onChange={(e) => setForm({ ...form, desc: e.target.value })} className="w-full px-3 py-2 rounded border text-sm" style={{ borderColor: C.silver }} />
          </div>
          <div>
            <label className="block text-xs uppercase tracking-widest font-bold mb-1" style={{ color: C.gray }}>Specs (one per line)</label>
            <textarea rows={5} value={form.specs} onChange={(e) => setForm({ ...form, specs: e.target.value })} className="w-full px-3 py-2 rounded border text-sm font-mono" style={{ borderColor: C.silver }} placeholder="Engine: 427 FE Side Oiler&#10;Trans: Top-Loader 4-speed&#10;Mileage: 2,400" />
          </div>
        </div>
        <div className="flex gap-2 mt-6">
          <button onClick={onClose} className="flex-1 py-3 rounded font-black uppercase tracking-wider" style={{ background: C.cream, color: C.charcoal, border: `2px solid ${C.silver}` }}>Cancel</button>
          <button onClick={handleSave} className="flex-1 py-3 rounded font-black uppercase tracking-wider text-white hover:opacity-90 flex items-center justify-center gap-2" style={{ background: C.red }}><Save size={16} /> Save</button>
        </div>
      </div>
    </Modal>
  );
}
